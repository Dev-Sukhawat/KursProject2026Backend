export default function RecentListCard({
  title,
  description,
  items,
  emptyText = "No data available",
  renderItem,
}) {

const sortedItems = [...items].sort((a, b) => {
  // Sortera efter startDate (från tidigast till senast)
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
});
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-8">{emptyText}</p>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => renderItem(item))}
        </div>
      )}
    </div>
  );
}