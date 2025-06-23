"use client";

import {
  Bot,
  Home,
  Plus,
  List,
  User,
  LogOut,
  Phone,
  MessageSquare,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

interface AppSidebarProps {
  user: { name: string; email: string };
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: "overview" | "create" | "list" | "detail") => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AppSidebar({
  onLogout,
  currentView,
  onNavigate,
  isOpen,
  onToggle,
}: AppSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      view: "overview" as const,
    },
    {
      title: "Create Complaint",
      icon: Plus,
      view: "create" as const,
    },
    {
      title: "My Complaints",
      icon: List,
      view: "list" as const,
    },
  ];
  let user = { name: "shubham", email: "hey" };
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-50 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col`}>
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">AI Complaint</h2>
              <p className="text-sm text-gray-600">Helper</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    onNavigate(item.view);
                    onToggle();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === item.view
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
