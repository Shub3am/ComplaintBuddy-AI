import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.agent) {
    let getLogs = await fetch(
      `https://backend.omnidim.io/api/v1/calls/logs?agentid=${body.agent}`,
      {
        headers: { Authorization: `Bearer ${process.env.omnidim}` },
      }
    ).then((res) => res.json());
    let checkChanges = await db
      .from("complains")
      .select("call_logs")
      .eq("agent_id", body.agent);
    console.log(checkChanges, getLogs);

    if (
      checkChanges.data[0].call_logs == null ||
      checkChanges.data[0].call_logs.length !== getLogs.call_log_data.length
    ) {
      let checkChanges = await db
        .from("complains")
        .update({ call_logs: getLogs.call_log_data })

        .eq("agent_id", body.agent);

      console.log("Ran Script");
      await fetch(`${process.env.website}/api/call/customer`, {
        method: "POST",
        body: JSON.stringify({ agent: body.agent }),
      });
      console.log("call to customer sent");
    }

    return NextResponse.json({ error: null, data: getLogs });
  } else {
    return NextResponse.json({ error: "Credentials Missing" });
  }
}
