"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";
import { ChevronRight } from "lucide-react";
import Button from "@/components/Button";
import { AnimatedShield, AnimatedCreditCard, AnimatedTrendingUp } from "@/components/AnimatedIcons";

const ONBOARDING_STEPS = [
  {
    title: "Welcome to RentManager",
    description: "The most advanced property ecosystem designed for modern landlords and tenants in Kenya.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    icon: <AnimatedShield />,
    accent: "Trusted"
  },
  {
    title: "Seamless Payments",
    description: "Pay rent instantly via M-Pesa. Track every transaction with automated digital receipts.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    icon: <AnimatedCreditCard />,
    accent: "Fast"
  },
  {
    title: "Smart Analytics",
    description: "Gain deep insights into your property performance with our AI-driven reporting tools.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    icon: <AnimatedTrendingUp />,
    accent: "Intelligent"
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const router = useRouter();
  const { setGlobalLoading } = useAction();

  useEffect(() => {
    // Show global loader until all images are preloaded
    setGlobalLoading(true);

    const preloadImages = async () => {
      const imageUrls = ONBOARDING_STEPS.map((step) => step.image);
      const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });

      await Promise.all(promises);
      
      // Artificial delay for smooth transition if it loads too fast
      setTimeout(() => {
        setImagesLoaded(true);
        setGlobalLoading(false);
      }, LOADER_DURATION);
    };

    preloadImages();
  }, [setGlobalLoading]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/landing");
    }
  };

  const step = ONBOARDING_STEPS[currentStep];

  if (!imagesLoaded) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-between font-sans">
      {/* Background Image Area (Top 60%) */}
      <div className="relative w-full h-[60%] overflow-hidden">
        <img
          key={step.image}
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-white"></div>
        
        {/* Skip Button */}
        <button 
          onClick={() => router.push("/landing")}
          className="absolute top-12 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/30 transition-all hover:bg-white/30"
        >
          Skip
        </button>
      </div>

      {/* Content Area (Bottom 40%) */}
      <div className="relative z-20 flex-1 w-full max-w-lg px-8 py-10 flex flex-col items-center text-center justify-between bg-white rounded-t-[40px] -mt-12">
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-6 duration-700 w-full flex flex-col items-center">
          {/* Icon Badge */}
          <div className="mb-6">
            {step.icon}
          </div>

          <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
            {step.accent} Ecosystem
          </span>
          
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
            {step.title}
          </h1>
          
          <p className="text-slate-500 text-base leading-relaxed max-w-[280px] mx-auto">
            {step.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="w-full mt-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-10">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === idx ? "w-8 bg-blue-600" : "w-2 bg-blue-100"
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            size="lg" 
            className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 border-none items-center justify-center group"
          >
            <span className="text-lg font-bold">
              {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Continue"}
            </span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* iOS Home Indicator Mockup */}
      <div className="pb-4 bg-white w-full flex justify-center">
        <div className="w-32 h-1.5 bg-slate-100 rounded-full"></div>
      </div>
    </div>
  );
}
