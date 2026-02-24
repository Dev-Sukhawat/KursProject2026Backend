export default function SectionHeader() {
  return (
    <div className="text-center mb-12 space-y-4">
      <div className="inline-block">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
          See It In Action
        </span>
      </div>

      <h2 className="text-4xl sm:text-5xl text-foreground tracking-tight">
        Your Workspace, Your Way
      </h2>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Discover how easy it is to book the perfect space for you or your team
      </p>
    </div>
  );
}
