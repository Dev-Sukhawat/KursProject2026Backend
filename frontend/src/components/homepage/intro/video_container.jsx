import Highlight from "./highlights";

export default function VideoContainer() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative group">
        {/* Decorative background blur */}
        <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>

        {/* Video wrapper */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50"
          style={{ paddingBottom: "56.25%" }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          >
            <source src="../../../assets/cowork-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Highlight />
    </div>
  );
}
