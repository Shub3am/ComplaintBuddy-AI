"use client";
import React, { useState } from "react";
import {
  Plus,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Bot,
  Building,
  Package,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

// Types
interface Complaint {
  id: string;
  title: string;
  company: string;
  product: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  phoneNumber: string;
  email: string;
  aiCallStatus?: "scheduled" | "calling" | "completed";
}

// Dashboard Component
function Dashboard({ complaints, onNewComplaint, onViewAll }) {
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ComplaintBuddy AI{" "}
          </h1>
          <p className="text-gray-600">
            Let AI handle your customer service calls on behalf of you
          </p>
        </div>
        <button
          onClick={onNewComplaint}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Complaint
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </p>
            </div>
            <Phone className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-lg shadow text-black">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Complaints</h2>
          <button
            onClick={onViewAll}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            View All
          </button>
        </div>
        <div className="p-6">
          {complaints.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No complaints yet. Create your first complaint!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.slice(0, 3).map((complaint) => (
                <Link
                  key={complaint.id}
                  target="_blank"
                  className="p-4"
                  href={`/complaints/details?id=${complaint.id}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {complaint.status === "resolved" && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {complaint.status === "in-progress" && (
                          <Clock className="h-5 w-5 text-blue-600" />
                        )}
                        {complaint.status === "pending" && (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{complaint.title}</h4>
                        <p className="text-sm text-gray-600">
                          {complaint.company} • {complaint.product}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          complaint.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : complaint.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {complaint.status.replace("-", " ")}
                      </span>
                      {complaint.aiCallStatus && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                          AI: {complaint.aiCallStatus}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>
          <p className="text-gray-700">
            AI calls customer service on your behalf
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">24/7 Available</h3>
          </div>
          <p className="text-gray-700">Round the clock complaint resolution</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Quick Resolution</h3>
          </div>
          <p className="text-gray-700">Faster than traditional methods</p>
        </div>
      </div>
    </div>
  );
}

// Create Complaint Component
function CreateComplaint({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    product: "",
    description: "",
    priority: "medium",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = () => {
    if (
      formData.title &&
      formData.company &&
      formData.product &&
      formData.description &&
      formData.phoneNumber &&
      formData.email
    ) {
      onSubmit(formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <div>
          <h1 className="text-3xl font-bold">Create New Complaint</h1>
          <p className="text-gray-600">
            Let AI handle your complaint automatically
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of your issue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Service *
              </label>
              <input
                type="text"
                required
                value={formData.product}
                onChange={(e) => handleChange("product", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product or service"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex space-x-4">
              {["low", "medium", "high"].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    className="mr-2"
                  />
                  <span className="capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your complaint in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Complaint List Component
function ComplaintList({ complaints, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 bg-white text-black">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <div>
          <h1 className="text-3xl font-bold">All Complaints</h1>
          <p className="text-gray-600">Track all your complaints</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Clear
          </button>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No complaints found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {complaint.status === "resolved" && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {complaint.status === "in-progress" && (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                    {complaint.status === "pending" && (
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    )}
                    <h3 className="text-lg font-semibold">{complaint.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        complaint.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {complaint.status.replace("-", " ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{complaint.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>{complaint.product}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{complaint.createdAt}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{complaint.description}</p>

                  {complaint.aiCallStatus && (
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                        AI Status: {complaint.aiCallStatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [complaints, setComplaints] = useState([
    {
      id: "1",
      title: "Defective Phone Screen",
      company: "TechCorp",
      product: "Smartphone X1",
      description:
        "The phone screen started flickering after 2 weeks of purchase. Need replacement or refund.",
      status: "in-progress",
      priority: "high",
      createdAt: "2024-01-15",
      phoneNumber: "+91 9876543210",
      email: "user@example.com",
      aiCallStatus: "calling",
    },
    {
      id: "2",
      title: "Wrong Order Delivered",
      company: "FoodieApp",
      product: "Food Delivery",
      description:
        "Ordered vegetarian meal but received non-vegetarian food. Need refund.",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-10",
      phoneNumber: "+91 9876543210",
      email: "user@example.com",
      aiCallStatus: "completed",
    },
  ]);

  const handleCreateComplaint = (formData) => {
    const newComplaint = {
      ...formData,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      aiCallStatus: "scheduled",
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    setCurrentView("dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "dashboard" && (
          <Dashboard
            complaints={complaints}
            onNewComplaint={() => setCurrentView("create")}
            onViewAll={() => setCurrentView("list")}
          />
        )}

        {currentView === "create" && (
          <CreateComplaint
            onSubmit={handleCreateComplaint}
            onCancel={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "list" && (
          <ComplaintList
            complaints={complaints}
            onBack={() => setCurrentView("dashboard")}
          />
        )}
      </div>
    </div>
  );
}
