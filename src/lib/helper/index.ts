export const nameTruncate = (name: string) => {
  if (name.length > 10) {
    return name.slice(0, 10) + "...";
  } else {
    return name;
  }
};

export function getRelativeTime(dateString: Date | string) {
  const now = Number(new Date());
  const then = Number(new Date(dateString));

  const seconds = Math.floor(Math.abs(now - then) / 1000);

  const intervals = [
    { key: "year", seconds: 31536000 },
    { key: "month", seconds: 2592000 },
    { key: "week", seconds: 604800 },
    { key: "day", seconds: 86400 },
    { key: "hour", seconds: 3600 },
    { key: "minute", seconds: 60 },
    { key: "second", seconds: 1 },
  ];

  let count = 0;
  for (const interval of intervals) {
    count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      // Pluralize the unit if necessary
      const unit = count === 1 ? interval.key : interval.key + "s";
      return `${count} ${unit} ago`;
    }
  }

  return "just now";
}
