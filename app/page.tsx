"use client";

import {
  Bot,
  Phone,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Zap,
  HeadphonesIcon,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Main({}) {
  const benefits = [
    {
      icon: Clock,
      title: "Save Your Time",
      description:
        "No more waiting on hold for hours. Our AI calls for you while you do other things.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Bot,
      title: "AI Does the Talking",
      description:
        "Our smart AI explains your problem clearly and professionally to customer service.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: CheckCircle,
      title: "Get Results Faster",
      description:
        "Most complaints get resolved in 2-3 days instead of weeks of back and forth.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Shield,
      title: "Never Give Up",
      description:
        "AI doesn't get tired or frustrated. It keeps trying until your problem is solved.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Zap,
      title: "Works 24/7",
      description:
        "Submit complaints anytime. AI starts working immediately, even at night.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      icon: HeadphonesIcon,
      title: "No Stress for You",
      description:
        "Avoid angry phone calls and arguments. Let AI handle the difficult conversations.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];
  const statistics = [
    {
      value: "70%",
      label: "of customer service calls involve wait times over 10 minutes",
      description: "Source: Industry Survey Data ( Reddit )",
    },
    {
      value: "5+ hours",
      label: "the average person spends on hold each year",
      description: "Source: From Reddit and Social Media Feedbacks",
    },
    {
      value: "90%",
      label: "reduction in resolution time for complex complaints",
      description: "Based on internal projections / initial pilot data",
    },
    {
      value: "85%",
      label: "improvement in user satisfaction with complaint resolution",
      description: "Based on projected user feedback",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Tell Us Your Problem",
      description:
        "Fill out a simple form with your complaint details and upload your receipt.",
    },
    {
      step: "2",
      title: "AI Makes the Call",
      description:
        "Our AI calls the company's customer service and explains your problem professionally.",
    },
    {
      step: "3",
      title: "Track Progress",
      description:
        "Watch real-time updates as AI works to resolve your complaint.",
    },
    {
      step: "4",
      title: "Get Your Solution",
      description:
        "Receive your refund, replacement, or resolution without any hassle.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-xl">ComplainBuddy AI</h1>
              <p className="text-sm text-gray-600">
                Let AI solve your problems
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/complaints"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
              Go to App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-6">
            <Sparkles className="h-3 w-3" />
            Code Clash 2.0 By Team OnCall Engineers
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tired of Calling Customer Service?
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Let our AI make those annoying calls for you. Get your refunds,
            replacements, and complaints resolved without the headache.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={"/complaints"}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition-colors">
              Start Solving Problems
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href={"#mvp"}
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 text-lg rounded-md hover:bg-gray-50 transition-colors">
              <Phone className="mr-2 h-5 w-5" />
              See How It Works
            </Link>
          </div>
          {/* NEW: Stats Section within Hero or as a new section below */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
                {stat.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Stats */}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How Can Our AI Agent Help?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI Bot will save you time and stop wasting your time on hold.
              it also handles your complaints while you focus on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className={`p-3 ${benefit.bgColor} rounded-lg w-fit mb-4`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50" id="mvp">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Workflow of our project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Examples */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Perfect For These Situations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether it's a big purchase or small issue, our AI can help you
              get it resolved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Broken Phone Screen",
                description: "Your new phone arrived with a cracked screen",
                example:
                  "AI calls Samsung and gets you a replacement within 3 days",
              },
              {
                title: "Wrong Food Delivery",
                description: "Restaurant sent the wrong order again",
                example:
                  "AI gets you a full refund plus discount for next order",
              },
              {
                title: "Defective Appliance",
                description:
                  "Your washing machine stopped working after 2 months",
                example:
                  "AI arranges free repair visit from authorized technician",
              },
              {
                title: "Overcharged Bill",
                description: "Internet company charged you twice this month",
                example:
                  "AI gets the extra charge removed and credits your account",
              },
              {
                title: "Cancelled Flight",
                description:
                  "Airline cancelled your vacation flight last minute",
                example:
                  "AI secures full refund plus compensation for the trouble",
              },
              {
                title: "Poor Service",
                description: "Hotel room was dirty and staff was rude",
                example:
                  "AI negotiates partial refund and future stay discount",
              },
            ].map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      AI Solution:
                    </span>
                  </div>
                  <p className="text-sm text-green-700">{problem.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 py-4">
            <p>Built for Code Clash 2.0. Made By Team OnCall Engineers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
