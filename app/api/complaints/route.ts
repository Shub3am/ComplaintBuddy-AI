import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  let getComplains = await db.from("complains").select("*");
  if (!getComplains.error && getComplains.data) {
    return NextResponse.json(getComplains.data);
  } else {
    return NextResponse.json({ error: getComplains.error }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  let body = await request.json();
  console.log(body);
  if (body.complain) {
    console.log(body.complain);
    let complain: {
      title: string;
      company: string;
      product: string;
      description: string;
      progress: string;
      orderNumber: string;
      companyPhone: string;
      customerEmail: string;
      customerPhone: string;
      customerName: string;
      purchaseAmount: string;
    } = body.complain;
    let createAgent = await fetch(
      "https://backend.omnidim.io/api/v1/agents/create",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.omnidim}` },
        body: JSON.stringify({
          name: `Customer Advocate for ${complain.customerName}`,
          welcome_message: `Hi, Is this ${complain.company} Support? I am calling on behalf of a customer from ${complain.customerName}. I'm inquiring about an issue related to the product: ${complain.product} that they bought from your company. Could you assist me with this?`,
          context_breakdown: [
            {
              title:
                "Speak On Behalf of the customer and give the details about issue customer is facing to the company support representative",
              body: ` Start the call by introducing yourself as a representative speaking on behalf of the customer which is ${complain.customerName}. Use a professional tone. Say that 'you are calling on behalf of ${complain.customerName} regarding their issue: ${complain.title} which in details is ${complain.description}. Could they assist me with this?' Wait for their acknowledgment before proceeding. `,
            },
            {
              title: "Providing Customer and Issue Details",
              body: ` Once connected, provide the representative with all relevant details. Say, 'I would like to share some details about the customer and the issue they are facing. The customer's name is ${complain.customerName}, and their email is ${complain.customerEmail}. The issue is titled ${complain.title}, and it relates to ${complain.product}, ordered under the number ${complain.orderNumber}. The purchase amount was ${complain.purchaseAmount}.' Confirm the details with the representative. `,
            },
            {
              title: "Understanding Solutions Offered by Support Team",
              body: ` Ask for their proposed solutions for the customer's problem. Say, 'Could you please explain the solutions you could offer for the problem related to ${complain.title}, ${complain.description}?' Listen carefully and take notes on their suggestions and check for clarity. `,
            },
            {
              title: "Inquiring About Alternative Solutions",
              body: ` After understanding the initial solutions, inquire if other alternatives are available. Ask, 'Are there any alternative solutions or options available for ${complain.customerName} regarding this issue?' Note their responses for differences in protocol or approach. `,
            },
            {
              title: "Handling Information Gaps",
              body: ` If the representative cannot answer certain questions, ask for a resource. Say, 'If this information doesn't solve the issue, whom at [company_name] can ${complain.customerName} contact for further support?' Ensure you get the contact details or alternative methods of assistance. `,
            },
            {
              title: "Concluding the Call",
              body: ` Wrap up the call with a friendly note. Say, 'Thank you for your assistance today. I'll make sure ${complain.customerName} is informed of the solutions and next steps. Have a great day!' Ensure all the information is clearly noted for communication back to the customer. `,
            },
          ],
          transcriber: {
            provider: "deepgram_stream",
            silence_timeout_ms: 200,
            model: "nova-3",
            numerals: true,
            punctuate: true,
            smart_format: false,
            diarize: false,
          },
          model: {
            model: "claude-3-7-sonnet-latest",
            temperature: 0.55,
          },
          voice: {
            provider: "eleven_labs",
            voice_id: "eA8FmgNe2rjMWPK5PQQZ",
          },
          post_call_actions: {
            email: {
              enabled: true,
              recipients: [complain.customerEmail],
              include: [
                "summary",
                "sentiment",
                "extracted_variables",
                "fullConversation",
              ],
            },
            extracted_variables: [
              { key: "customer_name", prompt: "Extract" },
              { key: "company_name", prompt: "Extract" },
              {
                key: "company_phone",
                prompt: "Extract or Generate company phone from conversation.",
              },
              {
                key: "description",
                prompt:
                  "Extract or Generate issue description from conversation.",
              },
              {
                key: "product",
                prompt:
                  "Extract or Generate product associated with the issue from conversation.",
              },
              {
                key: "purchase_amount",
                prompt:
                  "Extract or Generate purchase amount from conversation.",
              },
              {
                key: "order_number",
                prompt: "Extract or Generate order number from conversation.",
              },
              {
                key: "issue_title",
                prompt: "Extract or Generate issue title from conversation.",
              },
              {
                key: "progress",
                prompt:
                  "Extract or Generate current progress status of issue from conversation.",
              },
              {
                key: "customer_email",
                prompt: "Extract or Generate customer email from conversation.",
              },
              {
                key: "customer_phone",
                prompt: "Extract or Generate customer phone from conversation.",
              },
            ],
          },
        }),
      }
    ).then((res) => res.json());
    let addComplain = await db.from("complains").insert({
      customer_name: complain.customerName,
      company_name: complain.company,
      company_phone: complain.companyPhone,
      description: complain.description,
      product: complain.product,
      purchase_amount: complain.purchaseAmount,
      order_number: complain.orderNumber,
      issue_title: complain.title,
      progress: "pending",
      agent_id: createAgent.id,
      customer_email: complain.customerEmail,
      customer_phone: complain.customerPhone,
    });
    if (!addComplain.error) {
      let dispatchCallToCompany = await fetch(
        `${process.env.website}/api/call`,
        {
          method: "POST",
          body: JSON.stringify({ agent: createAgent.id, complain }),
        }
      ).then((res) => res.json());
      return NextResponse.json(addComplain);
    } else {
      return NextResponse.json({ error: addComplain.error }, { status: 404 });
    }
  }
}
