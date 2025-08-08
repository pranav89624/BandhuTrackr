import { useState, useEffect, lazy, Suspense } from "react";
import { LoadingSpinner, PageLayout } from "../components";
import { useSEO } from "../hooks";
import HeroSection from "../components/HeroSection";

// Lazy load non-critical components for better performance
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const WhyBandutrachkr = lazy(() => import("../components/WhyBanduTrackr"));
const FakeDemo = lazy(() => import("../components/FakeDemo"));
const TechStack = lazy(() => import("../components/TechStack"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // SEO Management
  useSEO({
    title: "BandhuTrackr - Know Your Real Bandhu",
    description:
      "Apne the ya nahi? Hum bata denge. Track your social media followers with BandhuTrackr.",
    keywords:
      "social media tracking, follower tracker, unfollow detector, bandhu tracker, instagram followers",
    ogTitle: "BandhuTrackr - Know Your Real Bandhu",
    ogDescription:
      "Apne the ya nahi? Hum bata denge. Track your social media followers with BandhuTrackr.",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen message="Loading BandhuTrackr application..." />;
  }

  return (
    <PageLayout>
      <HeroSection />

      {/* How It Works section with lazy loading */}
      <Suspense
        fallback={
          <div className="py-16 bg-white">
            <LoadingSpinner message="Loading How It Works section..." className="py-8" />
          </div>
        }
      >
        <HowItWorks />
      </Suspense>

      {/* Why Bandutrachkr section with lazy loading */}
      <Suspense
        fallback={
          <div className="py-16 bg-gray-50">
            <LoadingSpinner message="Loading Why Bandutrachkr section..." className="py-8" />
          </div>
        }
      >
        <WhyBandutrachkr />
      </Suspense>

      {/* FakeDemo section with lazy loading */}
      <Suspense
        fallback={
          <div className="py-16 bg-gradient-to-br from-green-50 to-saffron-50">
            <LoadingSpinner message="Loading Demo section..." className="py-8" />
          </div>
        }
      >
        <FakeDemo />
      </Suspense>

      {/* TechStack section with lazy loading */}
      <Suspense
        fallback={
          <div className="py-16 bg-white">
            <LoadingSpinner message="Loading Tech Stack section..." className="py-8" />
          </div>
        }
      >
        <TechStack />
      </Suspense>

      {/* Footer section with lazy loading */}
      <Suspense
        fallback={
          <div className="py-12 bg-gray-900">
            <LoadingSpinner message="Loading Footer..." className="py-8" />
          </div>
        }
      >
        <Footer />
      </Suspense>
    </PageLayout>
  );
};

export default Home;
