from omnidimension import Client

# Initialize client
client = Client('key')

# Dispatch a call to a specific number using an agent
agent_id = 1819  # Replace with your agent ID
to_number = "xxx"  # Must include country code
call_context = {
    "customer_name": "John Doe",
    "account_id": "ACC-12345",
    "priority": "high"
}

response = client.call.dispatch_call(agent_id, to_number, call_context)
print(response)

# # Create an agent
# response = client.agent.create(
#     name="Customer Advocate",
#     welcome_message="""Hi, I am calling on behalf of a customer from [customer_name]. I'm inquiring about an issue related to their order. Could you assist me with this?""",
#     context_breakdown=[
#                 {"title": "Initiating Contact with Customer Support", "body": """ Start the call by introducing yourself as a representative speaking on behalf of the customer. Use a professional tone. Say, 'Hi, I'm calling on behalf of [customer_name] regarding an issue they have with an order from your company. Could you assist me with this?' Wait for their acknowledgment before proceeding. """},
#                 {"title": "Providing Customer and Issue Details", "body": """ Once connected, provide the representative with all relevant details. Say, 'I would like to share some details about the customer and the issue they are facing. The customer's name is [customer_name], and their email is [customer_email]. The issue is titled [issue_title], and it relates to [product], ordered under the number [order_number]. The purchase amount was [purchase_amount].' Confirm the details with the representative. """},
#                 {"title": "Understanding Solutions Offered by Support Team", "body": """ Ask for their proposed solutions for the customer's problem. Say, 'Could you please explain the solutions you could offer for the problem related to [issue_title]?' Listen carefully and take notes on their suggestions and check for clarity. """},
#                 {"title": "Inquiring About Alternative Solutions", "body": """ After understanding the initial solutions, inquire if other alternatives are available. Ask, 'Are there any alternative solutions or options available for [customer_name] regarding this issue?' Note their responses for differences in protocol or approach. """},
#                 {"title": "Handling Information Gaps", "body": """ If the representative cannot answer certain questions, ask for a resource. Say, 'If this information doesn't solve the issue, whom at [company_name] can [customer_name] contact for further support?' Ensure you get the contact details or alternative methods of assistance. """},
#                 {"title": "Concluding the Call", "body": """ Wrap up the call with a friendly note. Say, 'Thank you for your assistance today. I'll make sure [customer_name] is informed of the solutions and next steps. Have a great day!' Ensure all the information is clearly noted for communication back to the customer. """}
#     ],
#     transcriber={
#         "provider": "deepgram_stream",
#         "silence_timeout_ms": 400,
#         "model": "nova-3",
#         "numerals": True,
#         "punctuate": True,
#         "smart_format": False,
#         "diarize": False
#     },
#     model={
#         "model": "claude-3-7-sonnet-latest",
#         "temperature": 0.7
#     },
#     voice={
#         "provider": "eleven_labs",
#         "voice_id": "eA8FmgNe2rjMWPK5PQQZ"
#     },
#     post_call_actions={
#         "email": {
#             "enabled": True,
#             "recipients": ["shubhamvishwakarma0604@gmail.com"],
#             "include": ["summary", "extracted_variables"]
#         },
#         "extracted_variables": [
#                     {"key": "customer_name", "prompt": "Extract or Generate customer name from conversation."},
#                     {"key": "company_name", "prompt": "Extract or Generate company name from conversation."},
#                     {"key": "company_phone", "prompt": "Extract or Generate company phone from conversation."},
#                     {"key": "description", "prompt": "Extract or Generate issue description from conversation."},
#                     {"key": "product", "prompt": "Extract or Generate product associated with the issue from conversation."},
#                     {"key": "purchase_amount", "prompt": "Extract or Generate purchase amount from conversation."},
#                     {"key": "order_number", "prompt": "Extract or Generate order number from conversation."},
#                     {"key": "issue_title", "prompt": "Extract or Generate issue title from conversation."},
#                     {"key": "progress", "prompt": "Extract or Generate current progress status of issue from conversation."},
#                     {"key": "customer_email", "prompt": "Extract or Generate customer email from conversation."},
#                     {"key": "customer_phone", "prompt": "Extract or Generate customer phone from conversation."}
#         ]
#     },
# )

# print(f"Status: {response['status']}")
# print(f"Created Agent: {response['json']}")

# # Store the agent ID for later examples
# agent_id = response['json'].get('id')
