"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import {
  MessageSquare,
  Bell,
  CalendarDays,
  ClipboardCheck,
  Settings,
  FileText,
} from "lucide-react";

const toolIcons = {
  "auto-reply": <MessageSquare className="text-indigo-500 w-6 h-6" />,
  "inventory-alerts": <Bell className="text-yellow-500 w-6 h-6" />,
  "booking-calendar": <CalendarDays className="text-green-500 w-6 h-6" />,
  "task-checklist": <ClipboardCheck className="text-purple-500 w-6 h-6" />,
  "store-settings": <Settings className="text-gray-600 w-6 h-6" />,
  "document-vault": <FileText className="text-blue-600 w-6 h-6" />,
};

export type SellerTool = {
  id: string;
  title: string;
  description: string;
  action: string;
};

type ToolField = {
  label: string;
  type: "textarea" | "number" | "select" | "file" | "checkbox";
  options?: string[];
};

export default function SellerToolsModal({
  open,
  onClose,
  tool,
}: {
  open: boolean;
  onClose: () => void;
  tool: SellerTool | null;
}) {
  const [fields, setFields] = useState<ToolField[]>([]);

  useEffect(() => {
    const loadFields = async () => {
      if (!tool) return;
      try {
        const res = await fetch(`/api/seller-tools/config?toolId=${tool.id}`);
        const data = await res.json();
        setFields(data);
      } catch (error) {
        toast.error("Failed to load tool config");
      }
    };
    loadFields();
  }, [tool]);

  if (!tool) return null;

  const icon = toolIcons[tool.id];

  const handleSave = async () => {
    if (!tool) return;

    let formData: Record<string, any> = {};

    fields.forEach((field) => {
      switch (field.type) {
        case "textarea":
          formData[field.label] = document.querySelector("textarea")?.value || "";
          break;
        case "number":
          formData[field.label] = parseInt(
            (document.querySelector("input[type='number']") as HTMLInputElement)?.value || "0"
          );
          break;
        case "select":
          formData[field.label] = (
            document.querySelector("select") as HTMLSelectElement
          )?.value;
          break;
        case "file":
          formData[field.label] =
            (document.querySelector("input[type='file']") as HTMLInputElement)?.files?.[0]?.name || "";
          break;
        case "checkbox":
          const el = Array.from(document.querySelectorAll("input[type='checkbox']"));
          formData["tasks"] = el.map((e) => ({
            label: e.parentElement?.textContent?.trim(),
            checked: (e as HTMLInputElement).checked,
          }));
          break;
        default:
          formData[field.label] = "Unsupported field type";
      }
    });

    try {
      const response = await fetch("/api/seller-tools/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          timestamp: new Date().toISOString(),
          formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("✅ Tool settings saved");
      onClose();
    } catch (error) {
      toast.error("❌ Save failed");
      console.error("Save error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-50 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className="text-xl font-semibold text-indigo-700">{tool.title}</h2>
        </div>

        <p className="text-gray-600 mb-4">{tool.description}</p>

        <div className="space-y-4 text-sm text-gray-700">
          {fields.length === 0 && (
            <div className="text-sm text-gray-500 italic">
              This tool is under development. Configuration options will appear here soon.
            </div>
          )}

          {fields.map((field, index) => {
            switch (field.type) {
              case "textarea":
                return (
                  <div key={index}>
                    <label className="block font-medium">{field.label}</label>
                    <textarea
                      className="w-full border border-gray-300 rounded p-2"
                      rows={4}
                      placeholder="Type your message..."
                    />
                  </div>
                );
              case "number":
                return (
                  <div key={index}>
                    <label className="block font-medium">{field.label}</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded p-2"
                      placeholder="Enter a number"
                    />
                  </div>
                );
              case "select":
                return (
                  <div key={index}>
                    <label className="block font-medium">{field.label}</label>
                    <select className="w-full border border-gray-300 rounded p-2">
                      {field.options?.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>
                );
              case "file":
                return (
                  <div key={index}>
                    <label className="block font-medium">{field.label}</label>
                    <input type="file" className="w-full border border-gray-300 rounded p-2" />
                  </div>
                );
              case "checkbox":
                return (
                  <label key={index} className="flex items-center gap-2">
                    <input type="checkbox" />
                    {field.label}
                  </label>
                );
              default:
                return null;
            }
          })}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}
