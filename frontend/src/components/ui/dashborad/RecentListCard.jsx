import { useMemo } from "react";

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

export default function RecentListCard({
  title,
  description,
  items = [],
  emptyText = "No data available",
  renderItem,
}) {
  // Sort items by created_at date (newest first) and take the top 5
  // const sortedItems = useMemo(() => {
  //   return [...items]
  //     .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  //     .slice(0, 5);
  // }, [items]);
  const latestItems = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6); // Keep it concise
  }, [items]);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="flow-root">
        {latestItems.length === 0 ? (
          <p className="text-gray-400 text-center py-8 italic">{emptyText}</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {latestItems.map((item, idx) => (
              <div key={item.id || idx} className="py-3 first:pt-0 last:pb-0">
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
