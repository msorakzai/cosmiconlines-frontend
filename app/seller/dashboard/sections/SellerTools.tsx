"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import SellerToolsModal from "../sections/SellerToolsModal";

import {
  MessageSquare,
  Bell,
  CalendarDays,
  ClipboardCheck,
  Settings,
  FileText,
} from "lucide-react";

export type SellerTool = {
  id: string;
  title: string;
  description: string;
  action: string;
  icon: JSX.Element;
};

export default function SellerTools() {
  const [activeTool, setActiveTool] = useState<SellerTool | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const tools: SellerTool[] = [
    {
      id: "auto-reply",
      title: "Auto-Reply Templates",
      description: "Respond to buyers instantly with pre-written messages.",
      action: "Manage Templates",
      icon: <MessageSquare className="text-indigo-500 w-6 h-6" />,
    },
    {
      id: "inventory-alerts",
      title: "Inventory Alerts",
      description: "Get notified when stock runs low or hits reorder level.",
      action: "Set Alerts",
      icon: <Bell className="text-yellow-500 w-6 h-6" />,
    },
    {
      id: "booking-calendar",
      title: "Booking Calendar",
      description: "Schedule service appointments and manage availability.",
      action: "View Calendar",
      icon: <CalendarDays className="text-green-500 w-6 h-6" />,
    },
    {
      id: "task-checklist",
      title: "Task Checklist",
      description: "Track daily seller tasks and completion status.",
      action: "Open Checklist",
      icon: <ClipboardCheck className="text-purple-500 w-6 h-6" />,
    },
    {
      id: "store-settings",
      title: "Store Settings",
      description: "Configure shipping, taxes, and seller preferences.",
      action: "Edit Settings",
      icon: <Settings className="text-gray-600 w-6 h-6" />,
    },
    {
      id: "document-vault",
      title: "Document Vault",
      description: "Securely store invoices, contracts, and legal files.",
      action: "Access Vault",
      icon: <FileText className="text-blue-600 w-6 h-6" />,
    },
  ];

  const handleClick = (tool: SellerTool) => {
    setActiveTool(tool);
    setModalOpen(true);
    toast(`🔧 Opening ${tool.title}`, {
      icon: "🚀",
      duration: 2000,
    });
  };

  const handleClose = () => {
    toast.success("✅ Tool closed");
    setModalOpen(false);
    setActiveTool(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700">🧰 Seller Tools</h1>
      <p className="text-gray-600">Automate and optimize your store operations.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-center gap-3 mb-2">
              {tool.icon}
              <h2 className="text-lg font-semibold text-gray-800">{tool.title}</h2>
            </div>
            <p className="text-sm text-gray-500">{tool.description}</p>
            <button
              onClick={() => handleClick(tool)}
              className="mt-3 text-sm text-indigo-600 hover:underline group-hover:text-indigo-800"
            >
              {tool.action}
            </button>
          </div>
        ))}
      </div>

      {/* 🔧 Injected modal */}
      <SellerToolsModal
        open={modalOpen}
        onClose={handleClose}
        tool={activeTool}
      />
    </div>
  );
}
