# ComplaintBuddy AI 🤖📞

**Tired of Calling Customer Service? Let our AI make those annoying calls for you.**

ComplaintBuddy AI is an intelligent customer service automation platform that calls companies on your behalf to resolve complaints, get refunds, replacements, and handle customer support issues. Built for **Code Clash 2.0** by **Team OnCall Engineers**, this hackathon project eliminates the frustration of long hold times and difficult customer service conversations.

## 🏆 Hackathon Project

**Event**: Code Clash 2.0  
**Team**: Team OnCall Engineer ( Team Leader: Shubham Vishwakarma )
**Team Leader**: Shubham Vishwakarma
**Goal**: Revolutionize and Help customers get faster redressal and grievance resolution by automating complaint resolution through AI-powered phone calls

## ✨ Key Features

### 🎯 **AI-Powered Phone Calls**
- AI agent calls customer service numbers on your behalf
- Professional and clear explanation of your problems
- Handles complex conversations with customer support representatives

### ⏰ **Save Your Time**
- No more waiting on hold for hours
- Submit complaints and let AI handle the rest
- Focus on what matters while AI works for you

### 🔄 **Persistent Problem Solving**
- AI doesn't get tired or frustrated
- Keeps trying until your problem is solved
- Works 24/7 - submit complaints anytime

### 📊 **Real-Time Tracking**
- Watch live updates as AI works on your complaint
- Get notifications on progress and resolution status
- Complete transparency throughout the process

### 🎯 **Faster Results**
- Most complaints resolved in 2-3 days
- No weeks of back-and-forth conversations
- Immediate action even during off-hours

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with React and TypeScript
- **Voice/Calling**: Twilio API Integrated with Omnidimension for phone call automation
- **AI Processing**: Omnidimension for intelligent conversation handling
- **Database**: Supabase with PostgreSQL
- **Deployment**: EC2

## 🚀 How It Works

### 1. **Tell Us Your Problem**
Fill out a simple form with:
- Complaint details and description
- Company information and customer service number
- Upload receipts or supporting documents
- Provide your contact information

### 2. **AI Makes the Call**
- Our AI agent calls the company's customer service
- Explains your problem professionally and clearly
- Handles questions and provides necessary information
- Negotiates solutions on your behalf

### 3. **Track Progress**
- Real-time dashboard showing call status
- Live updates on conversation progress
- Notifications for important developments
- Complete call logs and transcripts

### 4. **Get Your Solution**
- Receive refunds, replacements, or resolutions
- Get confirmation and documentation
- No hassle or stress for you

## 🎯 Perfect Use Cases

Our AI can help resolve various customer service issues:

| Problem | AI Solution |
|---------|-------------|
| **Broken Phone Screen** | AI calls Samsung, gets replacement within 3 days |
| **Wrong Food Delivery** | AI secures full refund plus discount for next order |
| **Defective Appliance** | AI arranges free repair visit from authorized technician |
| **Overcharged Bill** | AI gets extra charges removed and credits your account |
| **Cancelled Flight** | AI secures full refund plus compensation |
| **Poor Hotel Service** | AI negotiates partial refund and future stay discount |

## 👥 Team OnCall Engineers

This project was built by Team OnCall Engineers for Code Clash 2.0 hackathon. Our mission is to eliminate the frustration of customer service calls by leveraging AI technology.
Shubham Vishwakarma
Yash Tiwari
Manya Gambhir
Kritika Jha

## 📋 Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- Twilio account with phone number and API credentials
- Supabase project setup
- Omnidimension API access

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shub3am/ComplaintBuddy-AI.git
cd ComplaintBuddy-AI
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
supabase_url="https://xxxx"
supabase_key="xxxx"
omnidim="xxxxx"
website="http://localhost:3000" this is for client side routes
```


Open [https://codeclash.vshubham.com](https://codeclash.vshubham.com) to see the application.

## 🔧 API Integration

### Twilio Setup
1. Create a Twilio account
2. Purchase a phone number
3. Configure webhooks for call status updates
4. Add credentials to environment variables

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication
3. Create required database tables
4. Configure Row Level Security (RLS)

### Omnidimension Integration
1. Sign up for Omnidimension API
2. Configure AI conversation flows
3. Set up voice synthesis and recognition
4. Add API credentials to environment

## 🎨 Features in Detail

### Dashboard
- Submit new complaints with detailed forms
- Track active complaints and their status
- View call history and transcripts
- Monitor resolution progress

### AI Agent Capabilities
- Natural language processing for complaint understanding
- Professional phone conversation handling
- Context-aware responses to customer service representatives
- Persistent follow-up on unresolved issues
  
## 🚀 Deployment

### We Deployed this project on DigitalOcean

1.Clone Repo
2. Add Env
3. Build and Run
4. use Caddy for easy SSL certificate

### Environment Variables for Production

Ensure all production environment variables are properly configured:
- Database URLs should point to production Supabase
- Twilio credentials have to added in Omnidimension for direct integration
- AI service endpoints should be production-ready


## 🙏 Acknowledgments

- **Code Clash 2.0** organizers for the amazing hackathon
- **Twilio** for voice communication infrastructure
- **Supabase** for database and authentication services
- **Omnidimension** ( Sponser )for AI Call conversation capabilities

---

**Built with ❤️ by Team OnCall Engineers for Code Clash 2.0**
