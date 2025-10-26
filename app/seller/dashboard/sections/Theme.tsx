"use client";

import { useState, useEffect } from "react";
import { useSeller } from "@/context/SellerContext";
import {
  Moon, Sun, Palette, Sparkles, LayoutDashboard,
  Paintbrush, Type, Rows3, Wand2
} from "lucide-react";

export default function Theme() {
  const { sellerId } = useSeller();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [selectedTool, setSelectedTool] = useState("");
  const [suggestedTheme, setSuggestedTheme] = useState("");

  const themes = [
    { id: "light", label: "Light", icon: <Sun className="text-yellow-500" /> },
    { id: "dark", label: "Dark", icon: <Moon className="text-gray-700" /> },
    { id: "cosmic", label: "Cosmic", icon: <Palette className="text-indigo-500" /> },
  ];

  const themeColors = {
    light: { bg: "bg-gray-50", text: "text-gray-900" },
    dark: { bg: "bg-gray-900", text: "text-white" },
    cosmic: { bg: "bg-gradient-to-br from-indigo-600 to-purple-600", text: "text-white" },
  };

  const presets = [
    { id: "diwali", label: "Diwali Glow", theme: "cosmic", icon: <Sparkles className="text-orange-500" /> },
    { id: "eid", label: "Eid Elegance", theme: "light", icon: <Sparkles className="text-green-500" /> },
    { id: "winter", label: "Winter Chill", theme: "dark", icon: <Moon className="text-blue-600" /> },
    { id: "minimal", label: "Minimal Zen", theme: "light", icon: <LayoutDashboard className="text-gray-500" /> },
  ];

  const builderTools = [
    { id: "colors", title: "Color Scheme", description: "Choose primary and accent colors.", icon: <Paintbrush className="text-pink-600" />, action: "Edit Colors" },
    { id: "fonts", title: "Font Style", description: "Select typography for your brand.", icon: <Type className="text-purple-600" />, action: "Change Fonts" },
    { id: "layout", title: "Layout Blocks", description: "Rearrange homepage sections.", icon: <Rows3 className="text-indigo-600" />, action: "Configure Layout" },
  ];

  const current = themeColors[selectedTheme];

  const saveTheme = async (theme: string, preset: string) => {
    await fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellerId, theme, preset }),
    });
  };

  useEffect(() => {
    const loadTheme = async () => {
      const res = await fetch(`/api/theme?sellerId=${sellerId}`);
      const data = await res.json();
      setSelectedTheme(data.theme);
      setSelectedPreset(data.preset);
      setSuggestedTheme(data.suggested);
    };
    loadTheme();
  }, [sellerId]);

  const applyPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setSelectedTheme(preset.theme);
      setSelectedPreset(preset.id);
      saveTheme(preset.theme, preset.id);
    }
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setSelectedPreset("");
    saveTheme(themeId, "");
  };

  const applySuggested = () => {
    setSelectedTheme(suggestedTheme);
    setSelectedPreset("");
    saveTheme(suggestedTheme, "");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-10">
      {/* Theme Selection */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🎨 Store Theme Customization</h2>
        <p className="text-gray-600 mb-6">Choose how your store should look to customers.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                selectedTheme === theme.id && !selectedPreset
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              {theme.icon}
              <span className="mt-2 font-medium">{theme.label}</span>
            </button>
          ))}
        </div>

        {suggestedTheme && (
          <div className="mt-6 text-center">
            <button
              onClick={applySuggested}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              <Wand2 className="w-4 h-4" />
              Apply AI Suggested Theme: {suggestedTheme}
            </button>
          </div>
        )}
      </div>

      {/* Preset Manager */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🖼️ Seasonal & Saved Presets</h2>
        <p className="text-gray-600 mb-6">Apply a preset layout or style instantly.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                selectedPreset === preset.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-amber-300"
              }`}
            >
              {preset.icon}
              <span className="mt-2 font-medium">{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className={`transition-all duration-500 rounded-xl border border-gray-200 p-6 text-center shadow-inner ${current.bg} ${current.text}`}>
        <h3 className="text-xl font-semibold mb-2">Live Store Preview</h3>
        <p className="text-sm opacity-90">This is how your store homepage will look.</p>
        <div className="mt-6 flex justify-center gap-4">
          <div className={`w-20 h-24 rounded-lg ${selectedTheme === "dark" ? "bg-gray-800" : "bg-white"} shadow`} />
          <div className={`w-20 h-24 rounded-lg ${selectedTheme === "cosmic" ? "bg-purple-500" : "bg-gray-200"} shadow`} />
          <div className={`w-20 h-24 rounded-lg ${selectedTheme === "light" ? "bg-gray-50" : "bg-gray-700"} shadow`} />
        </div>
      </div>

      {/* Builder Tools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🧱 Theme Builder Tools</h2>
        <p className="text-gray-600 mb-6">Customize layout, colors, and fonts.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {builderTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition ${
                selectedTool === tool.id ? "border-purple-500" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                {tool.icon}
                <h2 className="text-lg font-semibold text-gray-800 mt-2">{tool.title}</h2>
                <p className="text-sm text-gray-500 text-center">{tool.description}</p>
                <span className="mt-3 text-sm text-purple-600 hover:underline">{tool.action}</span>
              </div>
            </button>
          ))}
        </div>

        {selectedTool && (
          <div className="mt-8 p-6 border border-dashed border-purple-300 rounded-xl bg-purple-50 text-purple-900">
            <h3 className="text-lg font-semibold mb-2">🔧 Editing: {builderTools.find(t => t.id === selectedTool)?.title}</h3>
            <p className="text-sm">
              This is where your customization UI will appear — color pickers, font selectors
              </p>
          </div>
        )}
      </div>
    </div>
  );
}