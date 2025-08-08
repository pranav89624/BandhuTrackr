import { User, Activity, UserMinus, Users, Shield, Zap, Settings, Heart } from "lucide-react";
import type { Step, Benefit, Technology, MockUser, SectionContent, AnimationConfig } from "./types";

// Export auth constants
export * from "./auth";

// How It Works Section Constants
export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    icon: User,
    title: "Login with Twitter",
    description: "Enter your Twitter username manually (for now!)",
    color: "text-blue-500",
    bgGradient: "from-blue-100 to-blue-200",
    stepGradient: "from-orange-400 to-red-400",
    ariaLabel: "Step 1: Login with your Twitter account manually",
  },
  {
    icon: Activity,
    title: "Background Monitoring",
    description: "We run scheduled checks to track your followers",
    color: "text-green-500",
    bgGradient: "from-green-100 to-green-200",
    stepGradient: "from-green-400 to-teal-400",
    ariaLabel: "Step 2: System monitors your followers in background",
  },
  {
    icon: UserMinus,
    title: "Detect Unfollowers",
    description: "Get notified when someone unfollows you",
    color: "text-red-500",
    bgGradient: "from-red-100 to-red-200",
    stepGradient: "from-red-400 to-pink-400",
    ariaLabel: "Step 3: Detect and get notified about unfollowers",
  },
  {
    icon: Users,
    title: "Take Action",
    description: "Unfollow the betrayers and keep your circle clean 😌",
    color: "text-orange-500",
    bgGradient: "from-orange-100 to-orange-200",
    stepGradient: "from-yellow-400 to-orange-400",
    ariaLabel: "Step 4: Take action against unfollowers to clean your circle",
  },
];

// Why BandhuTrackr Section Constants
export const BANDHU_TRACKR_BENEFITS: Benefit[] = [
  {
    icon: Shield,
    title: "Fully Local & Private",
    description: "Your data stays with you. No sharing, no selling, no nonsense.",
    gradient: "from-green-400 to-emerald-500",
    ariaLabel: "Privacy benefit: Your data remains completely local and private",
  },
  {
    icon: Zap,
    title: "Lightweight & Fast",
    description: "Runs with CRON jobs. No heavy lifting, just smart tracking.",
    gradient: "from-yellow-400 to-orange-500",
    ariaLabel: "Performance benefit: Lightweight and fast with CRON job automation",
  },
  {
    icon: Settings,
    title: "You Stay in Control",
    description: "Decide what to do with the data. We just provide the intel.",
    gradient: "from-blue-400 to-purple-500",
    ariaLabel: "Control benefit: You maintain full control over your data and decisions",
  },
  {
    icon: Heart,
    title: "Made for Solo Users",
    description: "Personal side project vibes. SaaS maybe coming later 👀",
    gradient: "from-pink-400 to-red-500",
    ariaLabel: "Personal benefit: Designed specifically for individual users",
  },
];

// Tech Stack Section Constants
export const TECH_STACK_TECHNOLOGIES: Technology[] = [
  {
    name: "React",
    color: "bg-blue-500",
    icon: "⚛️",
    ariaLabel: "React JavaScript library for building user interfaces",
  },
  {
    name: "TypeScript",
    color: "bg-blue-600",
    icon: "🔷",
    ariaLabel: "TypeScript for type-safe JavaScript development",
  },
  {
    name: "Vite",
    color: "bg-purple-500",
    icon: "⚡",
    ariaLabel: "Vite build tool for fast development",
  },
  {
    name: "TailwindCSS",
    color: "bg-teal-500",
    icon: "🎨",
    ariaLabel: "TailwindCSS utility-first CSS framework",
  },
  {
    name: "Framer Motion",
    color: "bg-pink-500",
    icon: "🎭",
    ariaLabel: "Framer Motion for smooth animations",
  },
  {
    name: "Open Source",
    color: "bg-green-500",
    icon: "🔓",
    ariaLabel: "Open source project available to the community",
  },
];

// Fake Demo Section Constants
export const DEMO_MOCK_DATA: MockUser[] = [
  {
    username: "@rajkumar_dev",
    status: "followed",
    days: 2,
    ariaLabel: "rajkumar_dev is still following you, last checked 2 days ago",
  },
  {
    username: "@priya_codes",
    status: "unfollowed",
    days: 5,
    ariaLabel: "priya_codes unfollowed you 5 days ago, action available to unfollow back",
  },
  {
    username: "@tech_sarthak",
    status: "followed",
    days: 8,
    ariaLabel: "tech_sarthak is still following you, last checked 8 days ago",
  },
  {
    username: "@designerAnju",
    status: "unfollowed",
    days: 1,
    ariaLabel: "designerAnju unfollowed you 1 day ago, action available to unfollow back",
  },
  {
    username: "@startup_vikash",
    status: "followed",
    days: 12,
    ariaLabel: "startup_vikash is still following you, last checked 12 days ago",
  },
  {
    username: "@mumbai_foodie",
    status: "unfollowed",
    days: 3,
    ariaLabel: "mumbai_foodie unfollowed you 3 days ago, action available to unfollow back",
  },
];

// Section Content Constants
export const SECTION_CONTENT: Record<string, SectionContent> = {
  howItWorks: {
    heading: "How It Works? 🤔",
    subheading: "Simple 4-step process to keep track of your social circle",
    ariaLabel: "Steps to use BandhuTrackr",
  },
  whyBandhuTrackr: {
    heading: "Why BandhuTrackr? 🎯",
    subheading:
      "Because friendship tracking shouldn't be rocket science, and your privacy shouldn't be a joke.",
    ariaLabel: "Benefits of using BandhuTrackr",
  },
  techStack: {
    heading: "Built with Modern Stack 🛠️",
    subheading: "Using the latest and greatest frontend technologies for a smooth experience.",
    ariaLabel: "Technologies used in BandhuTrackr",
    footer: "🌟 Open Source & built with love for the community",
  },
  demo: {
    heading: "See It in Action 👀",
    subheading: "Here's what your dashboard might look like (this is just a demo!)",
    ariaLabel: "Demo section showcasing BandhuTrackr dashboard",
    tableTitle: "Your Follow Status Report",
    ariaLabels: {
      dashboard: "Demo follow status dashboard",
      table: "Follow status table",
      tableDescription: "List of users and their follow status",
    },
  },
};

// Animation Constants
export const ANIMATION_CONFIG: AnimationConfig = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
  stagger: { delay: 0.1 },
  hover: {
    scale: 1.05,
    y: -5,
  },
};
