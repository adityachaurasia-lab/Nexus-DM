'use client';

import { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone, Mail, ShieldAlert, ArrowLeft, RefreshCw, Chrome } from 'lucide-react';
import { Card, Button, Input, useToast } from '@/components/ui';

// Mock scrolling creator testimonials/quotes for left marquee
const CREATORS = [
  { handle: '@alex_hustles', platform: 'Instagram', quote: 'Automated 12,000 DMs in 24 hours. Ban rate: 0%. I’m never typing again.', stats: '48.2k leads' },
  { handle: '@creative_jess', platform: 'YouTube', quote: 'Setup took 5 minutes. Now my comments instantly generate Stripe checkouts.', stats: '+$8,400 wk' },
  { handle: '@tech_reviews', platform: 'WhatsApp', quote: 'The visual automation flow is insane. Liquid brutalism design fits perfectly.', stats: '94% response' },
  { handle: '@influential_dan', platform: 'Twitter/X', quote: 'Free tier is generous, paid upgrades are no-brainers. My audience engagement has exploded.', stats: '3.4x clicks' },
];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Focus refs for OTP boxes
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Cooldown timer logic
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Handle send OTP action
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      toast('Please enter a valid phone number', 'warning');
      return;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast('Phone number must be in E.164 format (e.g. +1234567890)', 'warning');
      return;
    }

    if (!consentAccepted) {
      toast('You must accept the Terms and Privacy Policy to proceed.', 'warning');
      return;
    }

    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast(data.error || 'Failed to dispatch code.', 'error');
        return;
      }

      toast('Verification code successfully delivered via WhatsApp!', 'success');
      setStep(2);
      setCooldown(60);
      // Auto-focus first digit input box
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    } catch (error) {
      toast('Network connection failed. Please retry.', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle OTP inputs key navigations
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Allow only single characters
      value = value.charAt(value.length - 1);
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (value !== '' && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Submit credentials verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otpDigits.join('');
    if (code.length !== 6) {
      toast('Please enter the full 6-digit code', 'warning');
      return;
    }

    setIsSubmittingCode(true);
    try {
      const res = await signIn('credentials', {
        phone: phone.trim(),
        code,
        consentAccepted: String(consentAccepted),
        redirect: false,
      });

      if (res?.error) {
        toast(res.error || 'Invalid verification code', 'error');
        // Clear inputs on failure
        setOtpDigits(['', '', '', '', '', '']);
        otpRefs[0].current?.focus();
      } else {
        toast('Authentication successful! Welcome to NEXUS DM.', 'success');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast('Verification failed. Please retry.', 'error');
    } finally {
      setIsSubmittingCode(false);
    }
  };

  // Trigger Google Login
  const handleGoogleLogin = () => {
    if (!consentAccepted) {
      toast('You must accept the Terms and Privacy Policy to proceed.', 'warning');
      return;
    }
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[var(--bg-base)] overflow-hidden">
      {/* Left Column — Liquid Brutalism Kinetic Banner */}
      <section className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 bg-gradient-to-br from-[#FF3D00] via-[#FF5722] to-[#E64A19] text-white border-r-4 border-black overflow-hidden select-none">
        {/* Kinetic Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center font-bold text-xl border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[var(--accent-primary)]">
            N
          </div>
          <span className="font-display font-extrabold text-2xl tracking-wider">NEXUS DM</span>
        </div>

        {/* Scrolling Showcase - Testimonials */}
        <div className="relative z-10 my-auto flex flex-col gap-8 w-full">
          <h1 className="font-display font-black text-6xl xl:text-7xl leading-none uppercase tracking-tighter">
            Automate.<br />Connect.<br />Dominate.
          </h1>

          <div className="flex flex-col gap-4 overflow-hidden h-[220px] relative mt-4">
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#FF5722] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FF5722] to-transparent z-10" />
            
            <motion.div
              animate={{ y: [0, -400] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
              className="flex flex-col gap-4 py-2"
            >
              {[...CREATORS, ...CREATORS].map((creator, i) => (
                <div
                  key={i}
                  className="bg-black/20 p-4 border border-white/20 backdrop-blur-sm rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.15)] flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center text-xs font-mono opacity-80">
                    <span>{creator.handle}</span>
                    <span className="bg-white/10 px-2 py-0.5 border border-white/20">{creator.platform}</span>
                  </div>
                  <p className="text-sm font-medium italic">"{creator.quote}"</p>
                  <span className="text-xs font-bold text-[var(--accent-secondary)] self-end">{creator.stats}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/20 pt-6">
          <div className="flex flex-col">
            <span className="text-xs font-mono opacity-60">AUDITED BY</span>
            <span className="font-extrabold text-sm tracking-widest uppercase">Nexus Security</span>
          </div>
          <span className="text-xs font-mono bg-black text-[var(--accent-secondary)] px-3 py-1 border border-white/20">
            v1.0.0 Stable
          </span>
        </div>
      </section>

      {/* Right Column — Authentication Form Panel */}
      <section className="lg:col-span-7 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-6 right-6 z-20">
          {/* Theme Switcher or other top utilities */}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="w-full max-w-md"
        >
          {/* Branding title for Mobile View */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8 select-none">
            <div className="w-8 h-8 bg-black flex items-center justify-center font-bold text-md border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[var(--accent-primary)]">
              N
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-[var(--text-primary)]">NEXUS DM</span>
          </div>

          <Card className="p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[var(--bg-elevated)] rounded-none">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                /* STEP 1: LOGIN TRIGGERS (OAuth + Phone) */
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">Welcome Back</h2>
                    <p className="text-sm text-[var(--text-muted)] font-medium">
                      Select your preferred access channel below.
                    </p>
                  </div>

                  {/* Google OAuth Button */}
                  <Button
                    onClick={handleGoogleLogin}
                    className="w-full py-4 flex items-center justify-center gap-3 border-2 border-black bg-white hover:bg-neutral-50 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all font-bold text-sm rounded-none"
                  >
                    <Chrome className="w-5 h-5 text-red-500 fill-current" />
                    <span>Continue with Google</span>
                  </Button>

                  {/* Divider Line */}
                  <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t-2 border-black/10"></div>
                    <span className="flex-shrink mx-4 text-xs font-mono font-bold uppercase text-[var(--text-muted)]">OR</span>
                    <div className="flex-grow border-t-2 border-black/10"></div>
                  </div>

                  {/* WhatsApp Phone Input Form */}
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-mono font-bold uppercase text-[var(--text-primary)]">
                        WhatsApp Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-3.5 w-5 h-5 text-[var(--text-muted)]" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1234567890"
                          className="pl-11 pr-4 py-3 border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-[var(--bg-base)] text-sm font-semibold"
                          disabled={isSendingOtp}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono leading-relaxed mt-0.5">
                        Please include the country code prefix (e.g. +1 or +91).
                      </span>
                    </div>

                    {/* Consent checkbox */}
                    <label className="flex items-start gap-3 group cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consentAccepted}
                        onChange={(e) => setConsentAccepted(e.target.checked)}
                        className="w-5 h-5 mt-0.5 border-2 border-black bg-white checked:bg-black checked:text-white rounded-none cursor-pointer focus:ring-0"
                      />
                      <span className="text-xs text-[var(--text-muted)] font-medium leading-tight group-hover:text-[var(--text-primary)] transition-colors">
                        I agree to the{' '}
                        <a href="/legal/terms" className="underline font-bold text-[var(--text-primary)]">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/legal/privacy" className="underline font-bold text-[var(--text-primary)]">Privacy Policy</a>.
                      </span>
                    </label>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSendingOtp}
                      className="w-full py-4 flex items-center justify-center gap-2 border-2 border-black bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[4px_4px_0px_rgba(255,61,0,0.5)] transition-all font-bold uppercase rounded-none mt-2"
                    >
                      {isSendingOtp ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Sending OTP Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify with WhatsApp OTP</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                /* STEP 2: OTP VERIFICATION CODE FORM */
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors w-fit mb-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Phone number</span>
                    </button>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text-primary)]">Enter Code</h2>
                    <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                      We delivered a verification code to <span className="font-bold text-[var(--text-primary)]">{phone}</span>.
                    </p>
                  </div>

                  {/* 6 Digit Input Fields Container */}
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between gap-2.5">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-bold border-2 border-black bg-[var(--bg-base)] text-[var(--text-primary)] rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-0 focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all"
                            disabled={isSubmittingCode}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Resend Cooldown Counter */}
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-muted)]">Didn't receive a message?</span>
                      {cooldown > 0 ? (
                        <span className="text-[var(--text-muted)] font-bold">
                          Resend in {cooldown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[var(--accent-primary)] hover:underline font-bold"
                          disabled={isSendingOtp}
                        >
                          Resend Code
                        </button>
                      )}
                    </div>

                    {/* Verify Action Button */}
                    <Button
                      type="submit"
                      disabled={isSubmittingCode}
                      className="w-full py-4 flex items-center justify-center gap-2 border-2 border-black bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transition-all font-bold uppercase rounded-none"
                    >
                      {isSubmittingCode ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Signing you in...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Sign In</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Privacy Footnote */}
          <p className="text-center text-[10px] font-mono text-[var(--text-muted)] mt-6 leading-relaxed px-4">
            Security audit: All sessions are signed with HMAC-SHA256 tokens and protected under HttpOnly, Secure, SameSite=Strict cookies.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
