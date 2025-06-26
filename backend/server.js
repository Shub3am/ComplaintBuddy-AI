import express from "express"
import { createClient } from "@supabase/supabase-js"
import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
const app = express()

// Create Supabase client once
const supabase = createClient(process.env.supabase_url, process.env.supabase_key)
// Set up realtime listener when server starts
const setupRealtimeListener = () => {
    const changes = supabase
        .channel('check-agent-calls')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'complains',
            },
            (payload) => {
                console.log('Database change detected:', payload)
                if (payload.old.call_logs.length !== payload.new.call_logs.length) {
                    callCustomer(payload.new.agent_id)
                    console.log("call to customer sent")

                }
                // Handle your database changes here
                // You can add your custom logic to process the changes
            }
        )
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('Successfully subscribed to realtime changes')
            } else if (status === 'CHANNEL_ERROR') {
                console.error('Error subscribing to channel')
            } else if (status === 'TIMED_OUT') {
                console.error('Subscription timed out')
            }
        })

    return changes
}

const realtimeChannel = setupRealtimeListener()

app.listen(5000, () => {
    console.log('Realtime listener is active and monitoring database changes')
})

