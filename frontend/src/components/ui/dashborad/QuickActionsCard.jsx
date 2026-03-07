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
        <div className="p-3 bg-primary/85 rounded-lg">
          {Icon && <Icon size={24} className="text-primary-foreground" />}
        </div>

        <div>
          <h3 className="font-semibold text-secondary-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}