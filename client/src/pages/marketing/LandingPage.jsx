import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Sparkles,
  Upload,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Users,
  Clock,
  Zap,
  Shield,
  BarChart3,
  Briefcase,
  Brain,
  Rocket,
  Building2,
} from "lucide-react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { OptimizedAvatar } from "../../components/common/OptimizedAvatar";
import { Badge } from "../../components/Badge";
import { ShaderAnimation } from "../../components/ui/ShaderAnimation";
import { useGetPublicStatsQuery } from "../../features/landing/landingApi";
import { useGetPublicTestimonialsQuery } from "../../services/testimonialApi";

export function LandingPage() {
  const navigate = useNavigate();
  const { data: statsRes, isLoading: isStatsLoading } =
    useGetPublicStatsQuery();
  const publicStats = statsRes?.data;

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const usersWithAvatars =
    publicStats?.recentUsers?.filter((u) => u.avatar) || [];
  const allImagesLoaded = loadedImagesCount >= usersWithAvatars.length;
  const showSkeleton =
    isStatsLoading || (publicStats?.recentUsers && !allImagesLoaded);

  const getOptimizedUrl = (url, size = 40) => {
    if (!url) return null;
    if (url.includes("res.cloudinary.com") && !url.includes("q_auto")) {
      const parts = url.split("/upload/");
      if (parts.length === 2) {
        return `${parts[0]}/upload/q_auto,f_auto,w_${size},h_${size},c_fill/${parts[1]}`;
      }
    }
    return url;
  };

  const { data: testimonialsRes } = useGetPublicTestimonialsQuery();
  const dynamicTestimonials = testimonialsRes?.data?.top3Testimonials || [];

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fix scroll restoration bug (forces page to start at top)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isRecruiter = user?.role === "recruiter";

  const stats = [
    {
      value: publicStats ? publicStats.jobs : "...",
      label: "Active Jobs",
      icon: Briefcase,
      color: "from-indigo-500 to-indigo-500",
    },
    {
      value: publicStats ? publicStats.candidates : "...",
      label: "Candidates",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: publicStats ? publicStats.applications : "...",
      label: "Applications Processed",
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500",
    },
    {
      value: publicStats ? publicStats.companies : "...",
      label: "Companies Hiring",
      icon: Building2,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI Resume Parsing",
      description:
        "Upload your resume and our AI extracts skills, experience, and qualifications instantly.",
      color: "from-indigo-500 to-indigo-500",
    },
    {
      icon: Target,
      title: "Smart Job Matching",
      description:
        "Get personalized job matches with AI-powered match scores based on your skills.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description:
        "Compare your skills with job requirements and identify what to learn next.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Recruiter Dashboard",
      description:
        "Manage candidates, review applications, and track hiring pipeline.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: MessageSquare,
      title: "Instant Notifications",
      description:
        "Get instant notifications for job matches and application status changes.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Email verification, JWT tokens, and Google OAuth for secure access.",
      color: "from-sky-500 to-blue-500",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Resume",
      description: "Upload your resume in PDF or DOC format",
      icon: Upload,
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "AI extracts your skills and experience",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Find Matches",
      description: "Get personalized job recommendations",
      icon: Target,
    },
    {
      number: "04",
      title: "Apply & Track",
      description: "Apply to jobs and track application status",
      icon: CheckCircle2,
    },
  ];

  let testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "👩",
      content:
        "The AI resume parsing instantly identified my skills. The match score helped me find relevant jobs quickly.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Frontend Developer",
      avatar: "👨",
      content:
        "The skill gap analysis showed me exactly what technologies I need to learn. Very helpful!",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "Tech Recruiter",
      avatar: "👩",
      content:
        "The recruiter dashboard saves me hours. I can review applications and rank candidates efficiently.",
      rating: 5,
    },
  ];

  const displayTestimonials =
    dynamicTestimonials.length > 0 ? dynamicTestimonials : testimonials;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative">
      {/* Global subtle tint to match sections */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-indigo-500/5 dark:from-indigo-900/20 dark:to-indigo-900/20" />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-32">
        {/* Three.js ring shader (Visible in both modes, faint in Light Mode) */}
        {/* 
        <div
          className="pointer-events-none absolute inset-0 opacity-15 dark:opacity-40 dark:mix-blend-screen transition-opacity duration-700"
          aria-hidden="true"
        >
          <ShaderAnimation className="absolute inset-0 w-full h-full" />
        </div> 
        */}
        
        {/* Subtle radial vignette to keep text readable (only dark mode) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(3,7,18,0.7) 100%)",
          }}
        />

        {/* Floating glowing orbs (only in hero) */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge variant="primary" className="mb-6 px-4 py-2 text-sm gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by Gemini AI
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                Career Growth Platform
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Upload your resume, get AI-powered job matches, analyze skill
              gaps, and track your applications — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  navigate(
                    isAuthenticated
                      ? isRecruiter
                        ? "/app/recruiter-dashboard"
                        : "/app/dashboard"
                      : "/auth",
                  )
                }
                size="lg"
                className="gap-2"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}{" "}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => navigate("/features")}
              >
                See Features <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center">
              {/* Hidden preloaders for avatars */}
              {publicStats?.recentUsers && (
                <div className="hidden">
                  {usersWithAvatars.map((u) => (
                    <img
                      key={`preload-${u._id}`}
                      src={getOptimizedUrl(u.avatar)}
                      onLoad={() => setLoadedImagesCount((prev) => prev + 1)}
                      onError={() => setLoadedImagesCount((prev) => prev + 1)}
                      alt="preload"
                    />
                  ))}
                </div>
              )}

              <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-lg border border-gray-200/50 dark:border-white/10 shadow-sm transition-all duration-300">
                <div className="flex -space-x-2">
                  {showSkeleton
                    ? [...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-200 dark:bg-gray-800 animate-pulse relative flex-shrink-0 shadow-sm"
                          style={{ zIndex: 10 - i }}
                        />
                      ))
                    : publicStats?.recentUsers &&
                        publicStats.recentUsers.length > 0
                      ? publicStats.recentUsers.map((u, i) => {
                          const colors = [
                            "from-indigo-500 to-indigo-500",
                            "from-blue-500 to-cyan-500",
                            "from-emerald-500 to-teal-500",
                            "from-amber-500 to-orange-500",
                            "from-pink-500 to-rose-500",
                          ];
                          return (
                            <div
                              key={u._id || i}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-white dark:ring-gray-900 overflow-hidden shadow-sm relative flex-shrink-0 transition-transform hover:scale-110 hover:z-20 cursor-pointer"
                              style={{ zIndex: 10 - i }}
                              title={u.name}
                            >
                              {u.avatar ? (
                                <OptimizedAvatar
                                  src={u.avatar}
                                  alt={u.name}
                                  className="w-full h-full object-cover"
                                  size={40}
                                />
                              ) : (
                                <div
                                  className={`w-full h-full bg-gradient-to-br ${colors[i % colors.length]} text-white flex items-center justify-center text-[10px] sm:text-xs font-bold`}
                                >
                                  {u.name?.substring(0, 2)?.toUpperCase() ||
                                    "US"}
                                </div>
                              )}
                            </div>
                          );
                        })
                      : null}
                </div>

                <div className="w-px h-5 sm:h-6 bg-gray-300 dark:bg-gray-700/80" />

                <div className="text-gray-600 dark:text-gray-300 font-medium text-[11px] sm:text-xs text-left">
                  {showSkeleton ? (
                    <div className="h-4 w-24 sm:w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  ) : (
                    <p className="flex items-center gap-1">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-600 dark:from-indigo-400 dark:to-indigo-400 font-bold text-xs sm:text-sm">
                        {publicStats?.candidates || "800"}+
                      </span>{" "}
                      <span className="hidden sm:inline">
                        career builders already inside
                      </span>
                      <span className="sm:hidden">users joined</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-600 mt-6 font-medium">
              Free to use • AI-powered insights • Secure
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-500/20 blur-3xl" />
            <Card className="relative overflow-hidden py-6 px-4 text-center border border-indigo-100 dark:border-indigo-900/50 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl -z-10" />
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 dark:divide-gray-700 w-full py-2">
                <div className="flex flex-col items-center justify-center text-center p-3 sm:px-4">
                  {isStatsLoading ? (
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1.5" />
                  ) : (
                    <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5 tracking-tight">
                      {stats[0].value}+
                    </div>
                  )}
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest max-w-[180px] leading-relaxed">
                    Active job listings on the platform
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center text-center p-3 sm:px-4">
                  {isStatsLoading ? (
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1.5" />
                  ) : (
                    <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5 tracking-tight">
                      {stats[1].value}+
                    </div>
                  )}
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest max-w-[180px] leading-relaxed">
                    Career builders in our network
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-3 sm:px-4">
                  {isStatsLoading ? (
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-1.5" />
                  ) : (
                    <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1.5 tracking-tight">
                      {stats[2].value}
                    </div>
                  )}
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest max-w-[180px] leading-relaxed">
                    Applications processed seamlessly
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Ambient background for light mode glass effect */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Advance Your Career
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful AI-driven features for job seekers and recruiters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={i}
                  className="p-6 hover:shadow-2xl transition-all duration-300 border border-white/60 dark:border-indigo-900/50 bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-24 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Steps to
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Career Success
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Four simple steps to find your next job opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Ambient background for light mode glass effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Job Seekers
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                & Recruiters
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Real feedback from our users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {displayTestimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-2xl transition-all duration-300 border border-white/60 dark:border-indigo-900/50 bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full">
                    <OptimizedAvatar
                      src={
                        testimonial.avatar?.startsWith("http")
                          ? testimonial.avatar
                          : null
                      }
                      alt={testimonial.name}
                      fallbackText={
                        testimonial.avatar &&
                        !testimonial.avatar.startsWith("http")
                          ? testimonial.avatar
                          : testimonial.name?.charAt(0)?.toUpperCase() || "👩"
                      }
                      className="w-full h-full border border-gray-200 dark:border-gray-700"
                      size={100}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => navigate("/testimonials")}
              className="border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700 bg-white/50 hover:bg-indigo-50 dark:bg-gray-900/50 dark:hover:bg-indigo-900/30 text-indigo-700 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 group rounded-xl px-8 py-2.5 shadow-sm"
            >
              View All Feedback
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden p-12 text-center border border-indigo-100 dark:border-indigo-900/50 shadow-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Start Your Career Journey Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience AI-powered job matching and skill analysis — completely
              free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button
                onClick={() =>
                  navigate(
                    isAuthenticated
                      ? isRecruiter
                        ? "/app/recruiter-dashboard"
                        : "/app/dashboard"
                      : "/auth",
                  )
                }
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 border-transparent gap-2"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}{" "}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800/50 dark:text-indigo-300 dark:hover:bg-indigo-900/20 hover:scale-105 transition-all duration-300 gap-2"
                onClick={() => navigate("/features")}
              >
                See Features <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Free to use
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> AI-powered
                matching
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Instant
                results
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
