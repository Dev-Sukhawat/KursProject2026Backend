import { Calendar, Users, CheckCircle } from "lucide-react";

export default function Highlights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
      {/* Instant Booking */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 border-primary/30 backdrop-blur-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="size-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Instant Booking</h4>
          <p className="text-xs text-muted-foreground">Reserve in seconds</p>
        </div>
      </div>

      {/* Team Spaces */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 border-primary/30 backdrop-blur-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="size-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Team Spaces</h4>
          <p className="text-xs text-muted-foreground">Perfect for groups</p>
        </div>
      </div>

      {/* Live Updates */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 border-primary/30 backdrop-blur-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <CheckCircle className="size-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Live Updates</h4>
          <p className="text-xs text-muted-foreground">
            Real-time availability
          </p>
        </div>
      </div>
    </div>
  );
}
