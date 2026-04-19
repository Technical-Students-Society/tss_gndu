/**
 * Formats event date and time according to TSS requirements.
 * Example single day: "April 20, 2025 • 10:00 AM to 1:00 PM"
 * Example multi-day: "April 20, 2025 • 10:00 AM onwards"
 * 
 * @param {string} startAt - ISO date string for event start
 * @param {string} endAt - ISO date string for event end
 * @returns {string} Formatted date-time string
 */
export function formatEventDateTime(startAt, endAt) {
  if (!startAt) return "Date TBA";

  const start = new Date(startAt);
  const end = endAt ? new Date(endAt) : null;

  const dateOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  const startDateStr = start.toLocaleDateString("en-US", dateOptions);
  let startTimeStr = start.toLocaleTimeString("en-US", timeOptions).replace(":00", "").toLowerCase();

  if (!end) {
    return `${startDateStr} • ${startTimeStr} onwards`;
  }

  const isSameDay = 
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCDate() === end.getUTCDate();

  if (isSameDay) {
    let endTimeStr = end.toLocaleTimeString("en-US", timeOptions).replace(":00", "").toLowerCase();
    return `${startDateStr} • ${startTimeStr} to ${endTimeStr}`;
  } else {
    return `${startDateStr} • ${startTimeStr} onwards`;
  }
}
