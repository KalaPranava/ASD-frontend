"use client";

import { useState, FormEvent, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AuthForm({ defaultTab = "signin" }: { defaultTab?: "signin" | "register" }) {
  const [activeTab, setActiveTab] = useState<"signin" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password || (activeTab === "register" && (!firstName || !lastName))) {
      setErrorMsg("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("mockUsers") || "{}");

      if (activeTab === "register") {
        if (users[email]) {
          setErrorMsg("An account with this email already exists! Switch to Sign In.");
          setIsLoading(false);
          return;
        }
        users[email] = { password, role: "doctor", firstName, lastName };
        localStorage.setItem("mockUsers", JSON.stringify(users));
        localStorage.setItem("activeUser", JSON.stringify({ email, firstName, lastName }));
        
        // Success simulated - Redirect Dashboard
        window.location.href = "/dashboard";
        return;
      } else {
        if (!users[email]) {
          setErrorMsg("You are not registered. Please switch to the Register tab first.");
          setIsLoading(false);
        } else if (users[email].password !== password) {
          setErrorMsg("Incorrect password.");
          setIsLoading(false);
        } else {
          // Success simulated - Redirect Dashboard
          const user = users[email];
          localStorage.setItem("activeUser", JSON.stringify({ email, firstName: user.firstName, lastName: user.lastName }));
          window.location.href = "/dashboard";
          return;
        }
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-surface text-on-surface">
      {/* Decorative Light Leaks */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header Actions & Brand */}
      <header className="flex justify-between items-center p-8 z-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <svg className="w-10 h-10 text-primary animate-[bounce-eeg_2s_infinite_ease-in-out]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d="M2 12h4l3-9 5 18 3-9h5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-2xl font-bold font-headline tracking-tight">
            <span className="text-on-surface">Neuro</span><span className="text-primary">Lens</span>
          </span>
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high hover:bg-surface-variant transition-colors group"
        >
          <span suppressHydrationWarning className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
            {mounted && theme === "light" ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </header>

      {/* Form & Testimonial Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-12 z-10 w-full">
        <div className="w-full max-w-md space-y-12">
          
          {/* Tab Switcher */}
          <div className="flex justify-center space-x-12 relative border-b border-outline-variant/30 mb-8">
            <button
              onClick={() => { setActiveTab("signin"); setErrorMsg(""); setSuccessMsg(""); }}
              className={"font-headline text-xl font-bold pb-2 relative transition-all " + (activeTab === "signin" ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface font-medium")}
            >
              Sign In
              {activeTab === "signin" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
              )}
            </button>
            <button
              onClick={() => { setActiveTab("register"); setErrorMsg(""); setSuccessMsg(""); }}
              className={"font-headline text-xl font-bold pb-2 relative transition-all " + (activeTab === "register" ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface font-medium")}
            >
              Register
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {errorMsg && (
              <div className="bg-error-container/20 text-error border border-error/50 px-4 py-3 rounded-xl text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="bg-primary-container/20 text-primary border border-primary/50 px-4 py-3 rounded-xl text-sm font-medium">
                {successMsg}
              </div>
            )}

            {activeTab === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">
                    First Name
                  </label>
                  <div className="relative group">
                    <input
                      required={activeTab === "register"}
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                      placeholder="Sarah"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">
                    Last Name
                  </label>
                  <div className="relative group">
                    <input
                      required={activeTab === "register"}
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                      placeholder="Jenkins"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">
                {activeTab === "register" ? "Email Address" : "Work Email"}
              </label>
              <div className="relative group">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all outline-none"
                  placeholder={activeTab === "register" ? "name@domain.com" : "dr.chen@neurolens.com"}
                />
                <span className="material-symbols-outlined absolute right-4 top-4 text-outline group-focus-within:text-primary transition-colors">
                  mail
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1">
                {activeTab === "register" ? "Create Password" : "Security Key"}
              </label>
              <div className="relative group">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 transition-all outline-none pr-12"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {activeTab === "signin" && (
              <div className="flex items-center justify-between text-sm px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-surface-container-highest border-outline-variant text-primary focus:ring-primary/40 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                  />
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors cursor-pointer">
                    Remember Me
                  </span>
                </label>
                <a href="#" className="text-primary hover:text-primary-dim transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="w-full synaptic-pulse text-on-primary-fixed py-4 px-6 rounded-full font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(217,70,239,0.15)] hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-on-primary-fixed" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                activeTab === "signin" ? "Sign In Securely" : "Create Account"
              )}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-tighter">
              <span className="bg-surface px-4 text-on-surface-variant">Identity Providers</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 group/social">
            <button className="flex items-center justify-center gap-3 py-3 border border-outline/20 bg-surface-container-highest/20 rounded-full hover:bg-surface-bright transition-colors group-hover/social:border-outline-variant">
              <img
                alt=""
                className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBXgSSZsnnq-gDNMP_N5E1cNEI6cELbnfxi5zmY00rQlnugIo3yyeo6rZFiD4ik2USN_aW4ue4-K6tPCNYdbApe890CHsgK8LndiDMexLa7PQ4c6IColQZjcaEIHcMhWsZ-aeRr2Nw4Avd4Prj3664IguWoCE35tpA83Odtl3o3E7NYDIUIvgX49G-y3fPv1azm2ufH_WEli3kGx50v9LEsPyk_AuaZ39iYeQIilFs-0zYp4DrqFS-OdeeADNYb25x7gWde4hSPGpc"
              />
              <span className="font-medium text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-outline/20 bg-surface-container-highest/20 rounded-full hover:bg-surface-bright transition-colors group-hover/social:border-outline-variant">
              <img
                alt=""
                className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNecgDn5WNQhQLL_3LuC_dC2A1H-kcTAdc9_EdT3guhUM0mlI9mjkpRlSYPYuUhyygSCnModi7VJlrjysEotm06BjYVoJsbcJbk1aWkl5_aO-_nHJiDeJCKsB-783KECmZRbUNfUgrVlkQrezUY1hRKiQqCYeaKa7cPq-11WyqujxL9ggohWM1e8XYaWxK9cPvlalUXW5cYFaUNdjJ3LKOW2H0SLw67ReAGOM3wwNrcbQVLG89El7Yzc88K_aSFM4cSVSxOLDfsIB3"
              />
              <span className="font-medium text-sm">Microsoft</span>
            </button>
          </div>
        </div>

        {/* Testimonial Integrated into Main Layout */}
        <div className="pt-12 mt-12 w-full max-w-md border-t border-outline-variant/30">
          <div className="text-center space-y-3">
            <p className="text-on-surface-variant italic font-body text-base leading-relaxed">
              "The AI's precision has completely transformed our workflow."
            </p>
            <p className="font-headline font-semibold text-primary text-sm uppercase tracking-wider">
              — Dr. Sarah Chen, Neurologist
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-[10px] uppercase tracking-widest text-outline z-10">
        <a className="hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Security
        </a>
      </footer>
    </div>
  );
}
