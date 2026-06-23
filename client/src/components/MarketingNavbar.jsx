import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  Moon,
  Sun,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "./Button";
import { logout } from "../features/auth/authSlice";
import { OptimizedAvatar } from "./common/OptimizedAvatar";
import { ConfirmationModal } from "./common/ConfirmationModal";
import { motion, AnimatePresence } from "framer-motion";

export function MarketingNavbar({ currentPage, onNavigate, onGetStarted }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("darkMode") === "true"
      );
    }
    return false;
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setDarkMode(
      document.documentElement.classList.contains("dark") ||
        localStorage.getItem("darkMode") === "true",
    );
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newDarkMode);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    navigate("/");
    setShowLogoutConfirm(false);
    if (onGetStarted) onGetStarted();
  };

  const handleDashboard = () => {
    navigate("/app");
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Feedback" },
    { id: "contact", label: "Contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarUrl = user?.avatar || user?.company?.logo || null;

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-700 dark:from-indigo-400 dark:to-indigo-400 bg-clip-text text-transparent">
              SkillSync AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === link.id
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated && user ? (
              <div 
                className="relative h-full flex items-center" 
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 group"
                >
                  <div className="relative w-10 h-10 flex-shrink-0 shadow-md rounded-full">
                    <OptimizedAvatar
                      src={avatarUrl}
                      alt={user.name}
                      fallbackText={getInitials()}
                      className="w-full h-full text-sm"
                      size={100}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                  </div>
                  <div className="hidden lg:block text-left overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate whitespace-nowrap">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5 whitespace-nowrap">
                      {user.role === "recruiter" ? "Recruiter" : "Job Seeker"}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Premium Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute right-0 top-full mt-0 w-64 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-t-0 border-gray-200/60 dark:border-white/10 overflow-hidden z-50 rounded-b-2xl origin-top"
                    >
                      {/* User Info Section */}
                      <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white dark:from-white/5 dark:to-transparent border-b border-gray-200/60 dark:border-white/10">
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            handleDashboard();
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <LayoutDashboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            handleLogoutClick();
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onGetStarted}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Log In
                </Button>
                <Button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full md:hidden p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl"
            >
              <div className="flex flex-col gap-1.5 max-w-7xl mx-auto">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
                      currentPage === link.id
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                
                <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                  {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
                </button>

                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 mt-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="w-10 h-10 rounded-full ring-2 ring-indigo-500/20 overflow-hidden">
                        <OptimizedAvatar src={avatarUrl} alt={user.name} fallbackText={getInitials()} className="w-full h-full text-sm" size={40} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => { handleDashboard(); setMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </button>
                      <button onClick={() => { handleLogoutClick(); setMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button variant="outline" onClick={onGetStarted} className="w-full justify-center py-6 rounded-xl">Log In</Button>
                    <Button onClick={onGetStarted} className="w-full justify-center py-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-600 text-white">Get Started</Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
      />
    </nav>
  );
}
