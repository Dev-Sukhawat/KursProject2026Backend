export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          {Icon && <Icon size={24} className="text-blue-600" />}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}