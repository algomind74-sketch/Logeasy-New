// 🌐 LogEasy Utility Formatters

// ✅ Format timestamps to readable date/time
export function formatDateTime(isoString) {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ✅ Shorten log messages for table preview
export function truncateMessage(message, maxLength = 80) {
  if (!message) return "";
  return message.length > maxLength
    ? message.substring(0, maxLength) + "..."
    : message;
}

// ✅ Format log level with color coding
export function getLogLevelStyle(level) {
  switch (level?.toUpperCase()) {
    case "ERROR":
      return { color: "#dc2626", fontWeight: "bold" }; // red
    case "WARNING":
      return { color: "#f59e0b", fontWeight: "bold" }; // amber
    case "INFO":
      return { color: "#2563eb", fontWeight: "bold" }; // blue
    case "DEBUG":
      return { color: "#6b7280" }; // gray
    default:
      return { color: "#111827" };
  }
}

// ✅ Capitalize first letter of a string
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ✅ Convert bytes to readable format (for file size display)
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

// ✅ Format service name (e.g., "payment_service" → "Payment Service")
export function formatServiceName(name) {
  if (!name) return "";
  return name
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
