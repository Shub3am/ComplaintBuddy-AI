import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  if (body.agent) {
    console.log(body.complain);
    let dispatchCall = await fetch(
      "https://backend.omnidim.io/api/v1/calls/dispatch",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.omnidim}` },
        body: JSON.stringify({
          agent_id: body.agent,
          to_number: body.complain.company_phone,
        }),
      }
    );

    return NextResponse.json({ error: null });
  } else {
    return NextResponse.json({ error: "Credentials Missing" });
  }
}
