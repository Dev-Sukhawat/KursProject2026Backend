export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative p-8 rounded-2xl border border-border bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
