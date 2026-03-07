import { ArrowRight } from "lucide-react";
import LogoIMG from "../../assets/logov2.1_img.png";

export default function Header() {
  const handleGetStarted = () => {
    const section = document.getElementById("auth-section");
    section?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleLearnMore = () => {
    const section = document.getElementById("why_choose-section");
    section?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-card via-background to-accent/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/15 border border-primary/20 mb-6">
              <img src={LogoIMG} alt="logo_img" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-tight">
                Welcome to <span className="text-primary ">CoWork</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your modern coworking space booking platform. Reserve workspaces
                and conference rooms with ease.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 rounded-lg border bg-primary px-8 py-3 text-primary-foreground text-lg font-medium hover:opacity-90 transition"
              >
                Get Started
                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 text-lg font-medium hover:bg-muted transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
