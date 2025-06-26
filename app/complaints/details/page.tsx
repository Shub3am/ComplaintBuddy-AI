"use client";
import React, { useState, useEffect, Suspense } from "react";

import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Building,
  Package,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  MessageSquare,
  Star,
  Edit,
  Trash2,
  Download,
  Share2,
  ExternalLink,
  TestTube2,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

// Test data for the complaint
const complaintData = {
  id: "CMP-2024-001",
  title: "Defective Smartphone Battery Draining Issue",
  company: "TechCorp Solutions",
  product: "Smartphone Pro Max 256GB",
  description:
    "My smartphone battery started draining extremely fast after just 3 weeks of purchase. The phone goes from 100% to 20% in just 2-3 hours with minimal usage. I've tried all troubleshooting steps including factory reset, but the issue persists. This is affecting my work productivity and I need immediate resolution.",
  status: "in-progress",

  phoneNumber: "+91 9876543210",
  email: "john.doe@email.com",
  customerName: "John Doe",
  orderNumber: "ORD-2024-12345",
  purchaseDate: "2023-12-28",
  aiCallStatus: "calling",
  assignedAgent: "AI Assistant - Sarah",
  category: "Product Defect",
  refundAmount: "₹45,999",
  timeline: [
    {
      date: "2024-01-15",
      time: "10:30 AM",
      event: "Complaint Created",
      description: "Customer reported battery drainage issue",
      status: "completed",
    },
    {
      date: "2024-01-15",
      time: "11:00 AM",
      event: "AI Call Scheduled",
      description: "Automated call scheduled with customer service",
      status: "completed",
    },
    {
      date: "2024-01-16",
      time: "2:15 PM",
      event: "Technical Support",
      description: "Remote diagnostics performed",
      status: "completed",
    },
    {
      date: "2024-01-18",
      time: "11:00 AM",
      event: "Escalation",
      description: "Case escalated to hardware replacement team",
      status: "in-progress",
    },
    {
      date: "2024-01-20",
      time: "Expected",
      event: "Resolution",
      description: "Expected resolution date",
      status: "pending",
    },
  ],
};

function ComplaintCardPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [complain, setComplain] = useState([]);
  const [callLogs, setLogs] = useState([]);
  const searchParam = useSearchParams();

  useEffect(() => {
    (async () => {
      let id = searchParam.get("id");
      let getComplain = await fetch(`/api/complaints/${id}`).then((res) =>
        res.json()
      );
      let getLogs = await fetch(`/api/call/logs`, {
        method: "POST",
        body: JSON.stringify({ agent: getComplain[0].agent_id }),
      }).then((res) => res.json());

      if (getLogs.data.total_records) {
        setLogs(getLogs.data["call_log_data"]);
      }
      setComplain(getComplain[0]);
    })();
  }, [searchParam]);

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
      case "calling":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
      case "calling":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Unknown";
    try {
      const date = new Date(
        dateTimeString.replace(
          /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/,
          "$3-$1-$2T$4:$5:$6"
        )
      );
      return date.toLocaleString();
    } catch (error) {
      return dateTimeString;
    }
  };

  if (complain) {
    return (
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={"/complaints"}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Complaint Details
              </h1>
              <p className="text-gray-600">
                Track your complaint progress and updates
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button> */}
              {/* <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Complaint Overview Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(complain.progress)}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {complain.issue_title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          ID: {complain.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                          complain.status
                        )}`}>
                        {complain.progress?.replace("-", " ") || "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="h-4 w-4" />
                      <span>{complain.company_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{complain.product}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700">{complain.description}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      {
                        id: "details",
                        label: "Details",
                        icon: MessageSquare,
                      },
                      { id: "timeline", label: "Timeline", icon: Clock },
                      { id: "calls", label: "Call Logs", icon: Phone },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}>
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === "details" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Phone
                          </label>
                          <p className="text-gray-900">
                            {complain.company_phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Order Number
                          </label>
                          <p className="text-gray-900">
                            {complain.order_number}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchase Date
                          </label>
                          <p className="text-gray-900">{complain.created_at}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchase Amount
                          </label>
                          <p className="text-gray-900 font-semibold">
                            {complain.purchase_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "timeline" && (
                    <div className="space-y-4">
                      {complaintData.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              event.status === "completed"
                                ? "bg-green-500"
                                : event.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                {event.event}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {event.date} {event.time}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "calls" && (
                    <div className="space-y-4">
                      {callLogs && callLogs.length > 0 ? (
                        callLogs.map((call) => (
                          <div
                            key={call.id}
                            className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">
                                  {call.bot_name || `Call #${call.id}`}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                    call.call_status
                                  )}`}>
                                  {call.call_status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDateTime(call.time_of_call)} •{" "}
                                {formatDuration(call.call_duration_in_seconds)}
                              </div>
                            </div>

                            {/* Call Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div className="text-sm text-gray-600">
                                <strong>From:</strong>{" "}
                                {call.from_number || "Unknown"}
                              </div>
                              <div className="text-sm text-gray-600">
                                <strong>Sentiment:</strong>{" "}
                                {call.sentiment_score}
                              </div>
                            </div>

                            {/* Sentiment Analysis */}
                            {call.sentiment_analysis_details && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <h4 className="font-medium text-gray-900 mb-1">
                                  Summary
                                </h4>
                                <p className="text-gray-700 text-sm">
                                  {call.sentiment_analysis_details}
                                </p>
                              </div>
                            )}

                            {/* Extracted Variables */}
                            {call.extracted_variables && (
                              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Extracted Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                  {Object.entries(call.extracted_variables).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex justify-between">
                                        <span className="text-gray-600 capitalize">
                                          {key.replace("_", " ")}:
                                        </span>
                                        <span className="text-gray-900 font-medium">
                                          {value || "Not provided"}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Call Conversation Preview */}
                            {call.call_conversation && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Conversation Preview
                                </h4>
                                <div
                                  className="text-sm text-gray-700 max-h-20 overflow-hidden"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      call.call_conversation.substring(0, 200) +
                                      "...",
                                  }}
                                />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-900">
                                  Duration:{" "}
                                  {call.call_duration ||
                                    formatDuration(
                                      call.call_duration_in_seconds
                                    )}
                                </span>
                                <span className="text-sm text-gray-600">
                                  Channel: {call.channel_type}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {call.recording_url && (
                                  <a
                                    href={call.recording_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                                    <PlayCircle className="h-4 w-4" />
                                    Listen
                                  </a>
                                )}
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Phone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">
                            No call logs available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Customer Info Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{complain.customer_name}</p>
                      <p className="text-sm text-gray-600">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{complain.customer_phone}</p>
                      <p className="text-sm text-gray-600">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{complain.customer_email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Status Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold">AI Assistant Status</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Current Status:
                    </span>
                    <span className="px-2 py-1 text-xs bg-purple-200 text-purple-800 rounded-full">
                      {callLogs.length > 0
                        ? callLogs[0].call_status
                        : "No calls"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Last Agent:</span>
                    <span className="text-sm font-medium">
                      {callLogs.length > 0 ? callLogs[0].bot_name : "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Total Calls:</span>
                    <span className="text-sm font-medium">
                      {callLogs.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={async () => {
                      let retryComplain = await fetch(`/api/call`, {
                        method: "POST",
                        body: JSON.stringify({
                          agent: complain.agent_id,
                          complain: complain,
                        }),
                      }).then((res) => res.json());
                      if (retryComplain) {
                        alert("Call Sent Again!");
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 rounded-md text-blue-600">
                    <TestTube2 className="h-4 w-4" />
                    <span>Retry Call</span>
                  </button>{" "}
                  <button
                    onClick={async () => {
                      let retryComplain = await fetch(`/api/call/customer`, {
                        method: "POST",
                        body: JSON.stringify({
                          agent: complain.agent_id,
                          complain: complain,
                        }),
                      }).then((res) => res.json());
                      if (retryComplain) {
                        alert("Call Sent Again!");
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 rounded-md text-blue-600">
                    <TestTube2 className="h-4 w-4" />
                    <span>Simulate Customer Call</span>
                  </button>
                  <button
                    onClick={async () => {
                      let deleteComplain = await fetch(
                        `/api/complaints/${complain.id}`,
                        {
                          method: "DELETE",
                        }
                      ).then((res) => res.json());
                      if (deleteComplain) {
                        redirect("/complaints");
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 rounded-md text-red-600">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Complaint</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function Main() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
          <p>Loading...</p>
        </div>
      }>
      <ComplaintCardPage />
    </Suspense>
  );
}
