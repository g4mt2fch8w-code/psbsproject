import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Mail, Leaf, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";

import loginBg from "@/assets/login_bg.jpg";
import loginHero from "@/assets/login_hero.jpg";
import psbsLogo from "@/assets/psbs_logo.png";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Temporary local testing bypass
      localStorage.setItem('temp_admin_auth', 'true');
      navigate({ to: '/admin/dashboard' });
      return;

      await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: '/admin/dashboard' });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SmoothScroll />
      <CursorGlow />
      <Nav />
      <div className="relative min-h-screen w-full flex bg-ink text-fog overflow-hidden">
        
        {/* Left Side: Background / Image Side */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={loginHero} 
              alt="Nature Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-0 bg-emerald/10 mix-blend-overlay" />
          </div>

          {/* Glassmorphism Quote overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(16,185,129,0)", "0px 0px 20px rgba(16,185,129,0.4)", "0px 0px 0px rgba(16,185,129,0)"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 rounded-full border border-emerald/30 bg-white/5 p-1 overflow-hidden shrink-0"
              >
                <motion.img 
                  src={psbsLogo} 
                  alt="PSBS Logo" 
                  className="w-full h-full object-contain"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>
              <span className="text-emerald font-medium uppercase tracking-widest text-sm leading-tight">PSBS Administration</span>
            </div>
            <h2 className="text-3xl font-display text-white leading-tight mb-4">
              "Dedicated to preserving the intricate balance of Vidarbha's ecosystems."
            </h2>
            <p className="text-fog/70 text-sm">
              Authorized access only. If you are an NGO member or field researcher, please log in to access internal documents, field reports, and member directories.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Login Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
          
          {/* Return to Public Site Link (Desktop) */}
          <Link 
            to="/" 
            className="absolute top-28 left-8 lg:left-12 hidden lg:flex items-center gap-2 text-sm text-fog/60 hover:text-white transition-colors z-20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>

          {/* Background image for mobile (hidden on desktop) */}
          <div className="absolute inset-0 w-full h-full lg:hidden">
            <img 
              src={loginHero} 
              alt="Tiger Background" 
              className="w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/90 to-ink" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md relative z-10"
          >
            <div className="mb-10 text-center lg:text-left pt-28 lg:pt-0">
              {/* Return to Public Site Link (Mobile) */}
              <Link to="/" className="inline-flex lg:hidden items-center gap-2 text-sm text-fog/50 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Return to Public Website
              </Link>
              
              <div className="flex justify-center mb-8">
                <motion.img 
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -10, 0],
                    scale: 1,
                    filter: [
                      "drop-shadow(0px 0px 0px rgba(16,185,129,0))", 
                      "drop-shadow(0px 10px 25px rgba(16,185,129,0.6))", 
                      "drop-shadow(0px 0px 0px rgba(16,185,129,0))"
                    ],
                  }}
                  transition={{ 
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8, type: "spring" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  src={psbsLogo} 
                  alt="PSBS Logo" 
                  className="w-32 h-32 object-contain"
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Welcome Back</h1>
              <p className="text-fog/70">Sign in to your member account to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-fog/90 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-fog/40 group-focus-within:text-gold transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-fog/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all shadow-inner"
                    placeholder="member@psbs.org"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="ml-1">
                  <label className="text-sm font-medium text-fog/90">Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-fog/40 group-focus-within:text-gold transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-fog/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-2"
                  >
                    <span className="block">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FDB931 50%, #FFD700 100%)",
                  backgroundSize: "200% auto",
                  animation: "shimmer 6s linear infinite",
                  boxShadow: "0 0 20px rgba(201,161,59,0.3)"
                }}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-4 text-emerald/80 text-xs font-medium bg-emerald/5 py-2 px-4 rounded-full border border-emerald/10 w-fit mx-auto">
                <ShieldCheck className="w-4 h-4" />
                <span>256-bit Encrypted Connection</span>
              </div>
            </form>


          </motion.div>
        </div>
      </div>

      {/* Version / System Status Tag */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 text-[10px] uppercase tracking-widest text-fog/40 font-medium px-3 py-1.5 rounded-full bg-black/20 border border-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
        PSBS Admin OS v1.0 • System Online
      </div>
    </>
  );
}
