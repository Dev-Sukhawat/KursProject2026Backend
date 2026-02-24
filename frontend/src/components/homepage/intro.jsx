import StHeader from "./intro/section_header";
import VdContainer from "./intro/video_container";

export default function Intro() {
  return (
    <>
      <div
        className="relative bg-gradient-to-b from-background to-accent/30 py-20 sm:py-28"
        id="video-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StHeader />
          <VdContainer />
        </div>
      </div>
    </>
  );
}
