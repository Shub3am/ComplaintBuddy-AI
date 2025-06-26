import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
async function callCustomer(agentId) {
  const ai = new GoogleGenAI({ apiKey: process.env.gemini });

  let checkJobs = await db.from("complains").select().eq("agent_id", agentId);
  // console.log(checkJobs.data[0].call_logs[0].post_call_actions.email_service_ids)

  let response = await ai.models
    .generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarise this call recording for the customer, an AI agent talked on behalf of the customer to the customer support, here are all the details ${JSON.stringify(
        checkJobs.data[0].call_logs[0]
      )}`,
    })
    .then((i) => i.text);

  let complainDetails = checkJobs.data[0];

  let createAgent = await fetch(
    "https://backend.omnidim.io/api/v1/agents/create",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.omnidim}` },
      body: JSON.stringify({
        name: `Customer Callback for ${complainDetails.customer_name}`,
        welcome_message: `Hi, Is this ${complainDetails.customer_name}?`,
        context_breakdown: [
          {
            title: "Greet Customer and Confirm Availability",
            body: `Start by greeting the customer warmly: 'Hello ${complainDetails.customer_name}, I hope you're doing well today. This is a follow-up call regarding your recent issue with ${complainDetails.product} from ${complainDetails.company_name}. I have some important updates to share with you about your case. Do you have about 5-10 minutes to discuss this?' Wait for their confirmation before proceeding.`,
          },
          {
            title: "Provide Issue Summary and Reference Information",
            body: `Confirm the issue details with the customer: 'Let me first confirm the issue we addressed on your behalf. You submitted a complaint about ${
              complainDetails.issue_title
            } - specifically ${
              complainDetails.description || "the issue you were experiencing"
            }. ${
              complainDetails.order_number
                ? `Your case reference number is ${complainDetails.order_number}.`
                : ""
            } Is this correct?' Wait for their confirmation.`,
          },
          {
            title: "Share Solutions and Options Obtained",
            body: `Present the solutions obtained from ${complainDetails.company_name} which is ${response}: 'I'm pleased to share that I spoke with a representative from ${complainDetails.company_name} support, and tell them the solutions they've offered for your issue. Explain each solution clearly and ask if they have any questions about the options. If there are no solutions, tell them`,
          },

          {
            title: "Confirm Customer Satisfaction and Preferences",
            body: `Check customer satisfaction with the resolution: 'Are you satisfied with these solutions and the next steps? Is there anything else you'd like me to clarify or any additional concerns you have about this issue?' Listen carefully to their response and address any additional concerns.`,
          },
          {
            title: "Provide Contact Information and Close Professionally",
            body: `Conclude the call professionally: 'Thank you for your time today, ${complainDetails.customer_name}. You should receive a detailed email summary of our conversation on your email ${complainDetails.customer_email} and the solutions discussed. If you have any further questions or need additional assistance, please don't hesitate to contact us. Please keep your reference number ${complainDetails.id} handy for any future correspondence. Have a wonderful day!'`,
          },
        ],
        transcriber: {
          provider: "deepgram_stream",
          silence_timeout_ms: 400,
          model: "nova-3",
          numerals: false,
          punctuate: true,
          smart_format: false,
          diarize: false,
        },
        model: {
          model: "gpt-4o-mini",
          temperature: 0.7,
        },
        web_search: { enabled: true, provider: "DuckDuckGo" },
        call_type: "outgoing",
        voice: {
          provider: "eleven_labs",
          voice_id: "eA8FmgNe2rjMWPK5PQQZ",
        },
      }),
    }
  ).then((res) => res.json());

  await db
    .from("complains")
    .update({ customer_agent: createAgent.id })
    .eq("agent_id", agentId);

  let dispatchCall = await fetch(
    "https://backend.omnidim.io/api/v1/calls/dispatch",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.omnidim}` },
      body: JSON.stringify({
        agent_id: createAgent.id,
        to_number: complainDetails.customer_phone,
      }),
    }
  ).then((res) => res.json());
  console.log(dispatchCall, createAgent);
  console.log("agent created, calling customer");
  return true;
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.agent) {
    try {
      await callCustomer(body.agent);
      return NextResponse.json({ error: null, text: "Call Sent to Customer" });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e });
    }
  }
}
