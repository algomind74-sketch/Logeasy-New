import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState({
    refresh_interval: 10,
    theme: "light",
    notifications: true,
    auto_generate_reports: false,
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch settings from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/settings/")
      .then((res) => {
        setSettings(res.data);
        applyTheme(res.data.theme);
      })
      .catch((err) => console.error("Failed to fetch settings:", err));
  }, []);

  // ✅ Apply theme immediately when changed
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // ✅ Handle field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    };
    setSettings(updated);

    if (name === "theme") applyTheme(value);
  };

  // ✅ Save settings to backend
  const handleSave = async () => {
    try {
      await axios.put("http://127.0.0.1:8000/settings/update", settings);
      setMessage("✅ Settings updated successfully!");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update settings");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto shadow-lg rounded-2xl p-8 mt-6 transition-colors duration-500 ${
        settings.theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        ⚙️ Settings
      </h2>

      <div className="space-y-5">
        {/* Refresh interval */}
        <div>
          <label className="block text-sm font-medium">
            Refresh Interval (seconds)
          </label>
          <input
            type="number"
            name="refresh_interval"
            value={settings.refresh_interval}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-lg p-2 focus:ring-2 ${
              settings.theme === "dark"
                ? "bg-gray-800 border-gray-700 focus:ring-blue-400"
                : "bg-white border-gray-300 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-lg p-2 focus:ring-2 ${
              settings.theme === "dark"
                ? "bg-gray-800 border-gray-700 focus:ring-blue-400"
                : "bg-white border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="light">🌤️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label>Enable Notifications</label>
        </div>

        {/* Auto-generate reports */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="auto_generate_reports"
            checked={settings.auto_generate_reports}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label>Auto-generate Reports</label>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`mt-4 w-full py-2 rounded-lg transition ${
            settings.theme === "dark"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Save Settings
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-3 font-medium ${
              settings.theme === "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Settings;
