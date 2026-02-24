import {
  Calendar,
  Users,
  CheckCircle,
  Shield,
  Clock,
  MapPin,
} from "lucide-react";

import FeatureCard from "./why/FeatureCard";

export default function WhyChooseSection() {
  return (
    <div className="bg-card border-y border-border py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
            Why Choose CoWork?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your workspace bookings efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Calendar className="size-7 text-primary" />}
            title="Easy Booking"
            description="Book workspaces and meeting rooms in just a few clicks with our intuitive interface"
          />
          <FeatureCard
            icon={<Users className="size-7 text-primary" />}
            title="Flexible Spaces"
            description="Choose from individual desks to large conference rooms that fit your team's needs"
          />
          <FeatureCard
            icon={<CheckCircle className="size-7 text-primary" />}
            title="Real-time Availability"
            description="See what's available and book instantly with live updates on space availability"
          />
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <FeatureCard
            icon={<Shield className="size-7 text-primary" />}
            title="Secure Platform"
            description="Your data is protected with enterprise-grade security and privacy measures"
          />
          <FeatureCard
            icon={<Clock className="size-7 text-primary" />}
            title="24/7 Access"
            description="Book and manage your spaces anytime, anywhere with our always-available platform"
          />
          <FeatureCard
            icon={<MapPin className="size-7 text-primary" />}
            title="Prime Locations"
            description="Access premium coworking spaces in the best locations across the city"
          />
        </div>
      </div>
    </div>
  );
}
