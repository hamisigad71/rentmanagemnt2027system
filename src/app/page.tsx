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
    description:
      "The most advanced property ecosystem designed for modern landlords and tenants in Kenya.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    icon: <AnimatedShield />,
    accent: "Trusted",
  },
  {
    title: "Seamless Payments",
    description:
      "Pay rent instantly via M-Pesa. Track every transaction with automated digital receipts.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    icon: <AnimatedCreditCard />,
    accent: "Fast",
  },
  {
    title: "Smart Analytics",
    description:
      "Gain deep insights into your property performance with our AI-driven reporting tools.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    icon: <AnimatedTrendingUp />,
    accent: "Intelligent",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const router = useRouter();
  const { setGlobalLoading } = useAction();

  useEffect(() => {
    setGlobalLoading(true);
    const preloadImages = async () => {
      const imageUrls = ONBOARDING_STEPS.map((step) => step.image);
      const promises = imageUrls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      await Promise.all(promises);
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
    <div
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-between font-sans"
      style={{ background: "var(--color-background)" }}
    >
      {/* Background Image (top 60%) */}
      <div className="relative w-full h-[60%] overflow-hidden">
        <img
          key={step.image}
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Fade from image to cream */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent 40%, var(--color-background) 100%)",
          }}
        />

        {/* Skip button */}
        <button
          onClick={() => router.push("/landing")}
          className="absolute top-12 right-6 px-4 py-2 rounded-full text-white text-sm font-bold border transition-all"
          style={{
            background: "rgba(26, 26, 26, 0.4)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(255,255,255,0.25)",
          }}
        >
          Skip
        </button>
      </div>

      {/* Content panel (bottom 40%) */}
      <div
        className="relative z-20 flex-1 w-full max-w-lg px-8 py-10 flex flex-col items-center text-center justify-between rounded-t-[40px] -mt-12"
        style={{ background: "var(--color-background)" }}
      >
        <div
          key={currentStep}
          className="animate-in fade-in slide-in-from-bottom-6 duration-700 w-full flex flex-col items-center"
        >
          {/* Animated icon */}
          <div className="mb-6">{step.icon}</div>

          {/* Accent label */}
          <span
            className="font-bold text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--color-green-deep)" }}
          >
            {step.accent} Ecosystem
          </span>

          {/* Heading */}
          <h1
            className="text-3xl font-extrabold leading-tight mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            {step.title}
          </h1>

          {/* Description */}
          <p
            className="text-base leading-relaxed max-w-[280px] mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {step.description}
          </p>
        </div>

        {/* Footer */}
        <div className="w-full mt-auto">
          {/* Step progress dots */}
          <div className="flex justify-center gap-2 mb-10">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div
                key={idx}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: currentStep === idx ? "32px" : "8px",
                  background:
                    currentStep === idx
                      ? "var(--color-green-bright)"
                      : "var(--color-border-mid)",
                }}
              />
            ))}
          </div>

          {/* CTA button */}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full h-16 border-none items-center justify-center group"
          >
            <span className="text-lg font-bold">
              {currentStep === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Continue"}
            </span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* iOS home indicator */}
      <div
        className="pb-4 w-full flex justify-center"
        style={{ background: "var(--color-background)" }}
      >
        <div
          className="w-32 h-1.5 rounded-full"
          style={{ background: "var(--color-border-mid)" }}
        />
      </div>
    </div>
  );
}
