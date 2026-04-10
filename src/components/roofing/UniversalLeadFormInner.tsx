'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Home,
    Search,
    Clock,
    Calendar,
    ShieldCheck,
    Lock,
    CheckCircle,
    ArrowRight,
    Layers,
    Mail,
    User,
    Phone
} from 'lucide-react';
import { triggerLeadEvents } from '@/lib/analytics';
import { submitToWebhook } from '@/lib/webhooks';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

type FormData = {
    goal: string;
    duration: string;
    insured: string;
    timeline: string;
    roofAge: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    consent: boolean;
    selectedDate?: string;
    selectedTime?: string;
};

const INITIAL_DATA: FormData = {
    goal: '',
    duration: '',
    insured: '',
    timeline: '',
    roofAge: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    consent: false,
};

interface UniversalLeadFormInnerProps {
    onSuccess?: () => void;
    location?: string;
    inferredGoal?: string;
    showGoal?: boolean;
}

export default function UniversalLeadFormInner({
    onSuccess,
    location = 'Not Specified',
    inferredGoal,
    showGoal = true
}: UniversalLeadFormInnerProps) {
    const searchParams = useSearchParams();
    const [dynamicLocation, setDynamicLocation] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    // Initialize formData with inferredGoal if provided
    const [formData, setFormData] = useState<FormData>({
        ...INITIAL_DATA,
        goal: inferredGoal || INITIAL_DATA.goal
    });
    
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSlots, setBookingSlots] = useState<{ date: string; times: { time: string; row_number: any }[] }[]>([]);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [isFinalizing, setIsFinalizing] = useState(false);
    const [skippedBooking, setSkippedBooking] = useState(false);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    
    const formRef = useRef<HTMLDivElement>(null);
    const abandonmentTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return false;
        if (!email.includes('@')) return false;
        if (email.endsWith(',com')) return false;
        return emailRegex.test(email);
    };

    React.useEffect(() => {
        if (location !== 'Main Section Inline Form') return;

        const handleLeadSource = (e: any) => {
            if (e.detail && e.detail.source) {
                setDynamicLocation(e.detail.source);
            }
        };
        window.addEventListener('set_lead_source', handleLeadSource);
        return () => {
            window.removeEventListener('set_lead_source', handleLeadSource);
            if (abandonmentTimerRef.current) clearTimeout(abandonmentTimerRef.current);
        };
    }, [location]);

    // Total steps for UI display
    const totalSteps = showGoal ? 7 : 6;
    
    // Map internal step numbers to visual step numbers
    const getVisualStep = (internalStep: number) => {
        if (internalStep <= 3) return internalStep;
        if (internalStep === 4) return 4;
        if (internalStep >= 5) return showGoal ? internalStep : internalStep - 1;
        return internalStep;
    };

    const updateFormData = (fields: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...fields }));
    };

    const handleNextStep = async () => {
        // Early Lead Capture Trigger
        if (step === 1) {
            if (abandonmentTimerRef.current) clearTimeout(abandonmentTimerRef.current);
            abandonmentTimerRef.current = setTimeout(() => {
                submitToWebhook({
                    ...formData,
                    location: dynamicLocation || location,
                    status: 'ABANDONED_OR_IN_PROGRESS',
                    note: 'Triggered after 90 seconds of inactivity/slow progress'
                }, 'EARLY_CAPTURE');
            }, 90000);
        }

        setIsAnimating(true);
        setTimeout(() => {
            setStep((prev) => {
                // If showGoal is false, skip Step 4 (Goal)
                if (prev === 3 && !showGoal) return 5;
                return prev + 1;
            });
            setIsAnimating(false);
            if (formRef.current) {
                const yOffset = -100;
                const y = formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 300);
    };

    const handleSelectionCardClick = (field: keyof FormData, value: string) => {
        updateFormData({ [field]: value });
        setTimeout(() => {
            handleNextStep();
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (abandonmentTimerRef.current) {
            clearTimeout(abandonmentTimerRef.current);
            abandonmentTimerRef.current = null;
        }

        // Capture Meta IDs
        const fbclid = searchParams.get('fbclid') || '';
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return '';
        };
        const fbp = getCookie('_fbp') || 'NA';
        const fbc = getCookie('_fbc') || 'NA';
        const finalFbclid = fbclid || 'NA';

        const finalLocation = `${dynamicLocation || location} Lead ID fbclid:${finalFbclid} FBP:${fbp} FBC:${fbc}`;
    
        setIsSubmitting(true);
        setStep(8); // Move to "Verifying" step immediately to look realistic

        try {
            // Trigger Meta Event (don't wait for it)
            triggerLeadEvents({
                email: formData.email,
                phone: formData.phone,
                zipCode: formData.zipCode,
                firstName: formData.firstName,
                lastName: formData.lastName,
                fbp: fbp === 'NA' ? undefined : fbp,
                fbc: fbc === 'NA' ? undefined : fbc,
                fbclid: finalFbclid === 'NA' ? undefined : finalFbclid
            }, {
                goal: formData.goal,
                duration: formData.duration,
                insured: formData.insured,
                timeline: formData.timeline,
                roofAge: formData.roofAge
            });

            // 1. Submit lead to production
            const leadPromise = submitToWebhook({
                ...formData,
                location: finalLocation,
            }, 'PRODUCTION');

            // 2. Fetch booking slots from a dedicated disciplina/webhook
            const bookingPromise = submitToWebhook({
                zipCode: formData.zipCode,
                goal: formData.goal
            }, 'GET_BOOKING');

            // Wait for both, but we need bookingPromise response to proceed
            const [leadResult, bookingResult] = await Promise.all([leadPromise, bookingPromise]);

            // Artificial delay for realism if things were too fast
            await new Promise((resolve) => setTimeout(resolve, 2500));

            // High-reliability slot extraction and transformation
            let rawSlots = [];
            if (Array.isArray(bookingResult)) {
                rawSlots = bookingResult[0]?.availableSlots || bookingResult[0]?.data?.availableSlots || bookingResult;
            } else {
                rawSlots = bookingResult?.availableSlots || bookingResult?.data?.availableSlots || bookingResult?.data || bookingResult;
            }
            
            // Ensure we have an array
            const slotsArray = Array.isArray(rawSlots) ? rawSlots : (Array.isArray(bookingResult) ? bookingResult : []);

            // TRANSFORM: Group by date and collect all 'time_slotX' values with column-level protection
            const transformedSlots = slotsArray.reduce((acc: any[], current: any) => {
                if (!current.date) return acc;

                // Find if we already have this date entry
                let existing = acc.find(a => a.date === current.date);
                
                // Extract all raw keys for this date (time_slot1, time_slot2, etc)
                const allSlotKeys = Object.keys(current).filter(key => key.startsWith('time_slot'));
                
                if (!existing) {
                    existing = { date: current.date, times: [], bookedKeys: new Set<string>() };
                    acc.push(existing);
                }

                allSlotKeys.forEach(key => {
                    const value = current[key];
                    const isBooked = typeof value === 'string' && (
                        value.toUpperCase().includes('CONFIRMED') || 
                        value.toUpperCase().includes('BOOKED') ||
                        (current.status || '').toString().toUpperCase().includes('CONFIRMED')
                    );

                    if (isBooked) {
                        // Mark this SPECIFIC column (e.g. time_slot1) as booked for this date
                        existing.bookedKeys.add(key);
                        // Remove any existing (unbooked) entries that came from this column
                        existing.times = existing.times.filter((t: any) => t.sourceKey !== key);
                    } else if (typeof value === 'string' && value.trim().length > 0 && !existing.bookedKeys.has(key)) {
                        // Only add if this column hasn't been marked as booked yet
                        // Check if we already added a value for this column
                        if (!existing.times.some((t: any) => t.sourceKey === key)) {
                            existing.times.push({
                                time: value,
                                row_number: current.row_number,
                                sourceKey: key
                            });
                        }
                    }
                });

                return acc;
            }, []);

            // Final Sort: Order times chronologically (e.g. 2:00 PM before 4:00 PM)
            transformedSlots.forEach(slot => {
                slot.times.sort((a: any, b: any) => {
                    const timeA = new Date(`01/01/2000 ${a.time}`).getTime();
                    const timeB = new Date(`01/01/2000 ${b.time}`).getTime();
                    return timeA - timeB;
                });
            });

            if (transformedSlots.length > 0) {
                setBookingSlots(transformedSlots);
                setStep(9); // Booking Step
            } else {
                // Fallback to "Thank you" if no slots could be parsed
                setStep(10); // Final Success
            }
            
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            setStep(10);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderProgressHeader = () => {
        if (step >= 8) return null; // Post-submission states have their own UI

        const visualStep = getVisualStep(step);
        const progressPercentage = ((visualStep - 1) / totalSteps) * 100;

        let stepTitle = '';
        switch (step) {
            case 1: stepTitle = 'Your Contact Info'; break;
            case 2: stepTitle = 'Your Zip Code'; break;
            case 3: stepTitle = 'Current Roof Age'; break;
            case 4: stepTitle = 'Project Goal'; break;
            case 5: stepTitle = 'Problem Duration'; break;
            case 6: stepTitle = 'Insurance Status'; break;
            case 7: stepTitle = 'Timeline'; break;
        }

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm italic">
                            {visualStep}
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-800">
                            {stepTitle}
                        </h3>
                    </div>
                    <div className="text-sm font-bold text-slate-400">Step {visualStep} of {totalSteps}</div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-slate-900 transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        );
    };

    const renderTrustSignals = () => {
        if (step >= 10) return null; // Don't show footer seals on the very last success state
        return (
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>Secure 256-bit SSL</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified Contractor</span>
                </div>
            </div>
        );
    };

    return (
        <div
            ref={formRef}
            className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-4 sm:p-5 md:p-10 shadow-2xl shadow-slate-900/10 border border-slate-100 relative min-h-[300px] md:min-h-[450px]"
        >
            {renderProgressHeader()}

            <div className={`transition-all duration-500 transform overflow-hidden ${isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>

                {/* STEP 1: Contact Info */}
                {step === 1 && (
                    <div className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase text-slate-700">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => updateFormData({ firstName: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 transition-colors font-medium text-slate-900 text-base sm:text-lg"
                                        placeholder="John"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase text-slate-700">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                                    className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 transition-colors font-medium text-slate-900 text-base sm:text-lg"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-slate-700">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateFormData({ phone: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 transition-colors font-medium text-slate-900 text-base sm:text-lg"
                                    placeholder="(814) 449-0824"
                                    inputMode="tel"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData({ email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 transition-colors font-medium text-slate-900 text-base sm:text-lg"
                                    placeholder="john@example.com"
                                    inputMode="email"
                                />
                                {emailError && (
                                    <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">
                                        {emailError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div
                            onClick={() => updateFormData({ consent: !formData.consent })}
                            className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/80 transition-colors"
                        >
                            <Checkbox
                                id="consent"
                                checked={formData.consent}
                                onCheckedChange={(checked) => updateFormData({ consent: checked as boolean })}
                                className="mt-1"
                            />
                            <label
                                htmlFor="consent"
                                className="text-sm text-slate-600 leading-snug font-medium cursor-pointer select-none"
                            >
                                I agree to be contacted via email or phone regarding my request and acknowledge the privacy policy.
                            </label>
                        </div>

                        <button
                            onClick={() => {
                                if (!validateEmail(formData.email)) {
                                    setEmailError("Please enter a valid email (e.g. name@example.com)");
                                    return;
                                }
                                setEmailError(null);
                                handleNextStep();
                            }}
                            disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.consent}
                            className="w-full py-3 sm:py-4 rounded-2xl bg-premiumAccent text-white font-black uppercase tracking-widest text-base sm:text-lg md:text-xl italic group hover:shadow-xl hover:shadow-premiumAccent/30 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-4 flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* STEP 2: Zip Code (Moved up) */}
                {step === 2 && (
                    <div className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-slate-700 font-black italic tracking-tighter">Your Zip Code</label>
                            <input
                                required
                                type="text"
                                value={formData.zipCode}
                                onChange={(e) => updateFormData({ zipCode: e.target.value })}
                                className="w-full px-4 py-3 sm:py-4 rounded-xl border-2 border-slate-100 focus:border-slate-900 focus:ring-0 transition-colors font-medium text-slate-900 text-base sm:text-lg"
                                placeholder="12345"
                                inputMode="numeric"
                            />
                        </div>
                        <button
                            onClick={() => {
                                if (formData.zipCode) handleNextStep();
                            }}
                            disabled={!formData.zipCode}
                            className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-lg italic hover:shadow-xl transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors mt-4"
                        >
                            ← Back
                        </button>
                    </div>
                )}

                {/* STEP 3: Roof Age (New) */}
                {step === 3 && (
                    <div className="space-y-6 text-left text-center">
                        <label className="text-xl font-bold uppercase text-slate-700 italic tracking-tight block mb-6">How old is your current roof?</label>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: '0-5', label: '1 - 5 Years' },
                                { id: '5-10', label: '5 - 10 Years' },
                                { id: '10-20', label: '10 - 20 Years' },
                                { id: '20+', label: '20+ Years' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectionCardClick('roofAge', item.label)}
                                    className={`
                                        py-4 sm:py-5 rounded-2xl border-2 transition-all duration-300 font-bold uppercase tracking-wide text-base sm:text-lg
                                        ${formData.roofAge === item.label
                                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors mt-4"
                        >
                            ← Back
                        </button>
                    </div>
                )}


                {/* STEP 4: Goal (Only shown if showGoal=true) */}
                {step === 4 && (
                    <div className="space-y-6 text-left">
                        <label className="text-xl font-bold uppercase text-slate-700 italic tracking-tight block text-center mb-6">What is the goal of your project?</label>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'replacement', label: 'Full Roof Replacement' },
                                { id: 'repair', label: 'Roof Repair' },
                                { id: 'new_construction', label: 'New Construction' },
                                { id: 'other', label: 'Other' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectionCardClick('goal', item.label)}
                                    className={`
                                        py-4 sm:py-5 rounded-2xl border-2 transition-all duration-300 font-bold uppercase tracking-wide text-base sm:text-lg
                                        ${formData.goal === item.label
                                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors mt-4"
                        >
                            ← Back
                        </button>
                    </div>
                )}



                {/* STEP 5: Duration (Former Step 3) */}
                {step === 5 && (
                    <div className="space-y-6 text-left">
                        <label className="text-xl font-bold uppercase text-slate-700 italic tracking-tight block text-center mb-6">How long has this problem been going on for?</label>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'just_now', label: 'Just now' },
                                { id: 'couple_days', label: 'Couple of days' },
                                { id: 'few_weeks', label: 'Few Weeks' },
                                { id: 'months', label: 'Months' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectionCardClick('duration', item.label)}
                                    className={`
                                        py-4 sm:py-5 rounded-2xl border-2 transition-all duration-300 font-bold uppercase tracking-wide text-base sm:text-lg
                                        ${formData.duration === item.label
                                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors mt-4"
                        >
                            ← Back
                        </button>
                    </div>
                )}

                {/* STEP 6: Insurance (Former Step 4) */}
                {step === 6 && (
                    <div className="space-y-6 text-left">
                        <label className="text-xl font-bold uppercase text-slate-700 italic tracking-tight block text-center mb-6">Is Your Roof Insured?</label>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'yes', label: 'Yes' },
                                { id: 'no', label: 'No' },
                                { id: 'idk', label: "I don't know" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectionCardClick('insured', item.id)}
                                    className={`
                                        py-4 sm:py-5 rounded-2xl border-2 transition-all duration-300 font-bold uppercase tracking-wide text-base sm:text-lg
                                        ${formData.insured === item.id
                                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(5)}
                            className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
                        >
                            ← Back
                        </button>
                    </div>
                )}

                {/* STEP 7: Timeline + SUBMIT (Former Step 5) */}
                {step === 7 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h4 className="text-xl font-bold uppercase text-slate-700 italic tracking-tight text-center mb-6">How soon do you need this fixed?</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'asap', label: 'ASAP', icon: Clock },
                                { id: 'this_week', label: 'WITHIN THIS WEEK', icon: Calendar },
                                { id: 'this_month', label: 'WITHIN THIS MONTH', icon: Search },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => updateFormData({ timeline: item.id })}
                                    className={`
                relative flex items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:scale-[0.98] active:scale-95 hover:shadow-xl
                ${formData.timeline === item.id
                                            ? 'border-slate-900 bg-slate-900 text-white ring-4 ring-slate-900/20'
                                            : 'border-slate-100 hover:border-slate-300 bg-white'
                                        }
                `}
                                >
                                    <item.icon className={`w-8 h-8 ${formData.timeline === item.id ? 'text-white' : 'text-slate-700'}`} />
                                    <span className="text-base sm:text-lg font-bold uppercase tracking-tight italic">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.timeline}
                                className="w-full py-4 sm:py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-base sm:text-lg md:text-xl italic relative overflow-hidden group hover:shadow-xl hover:shadow-slate-900/30 active:scale-95 transition-all duration-300 mt-8"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? 'Processing...' : 'SUBMIT'}
                                    {!isSubmitting && <ArrowRight className="w-6 h-6" />}
                                </span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(6)}
                                className="w-full text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
                            >
                                ← Back
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 8: Verification / Loading (REALISM) */}
                {step === 8 && (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-premiumAccent animate-spin" />
                            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse" />
                            <CheckCircle className="absolute inset-x-0 inset-y-0 m-auto w-10 h-10 text-emerald-500 opacity-50" />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 mb-4">
                            Finalizing your information...
                        </h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">
                            Verifying availability in {formData.zipCode}...
                        </p>
                        
                        <div className="max-w-xs mx-auto space-y-3">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4, ease: "easeInOut" }}
                                    className="h-full bg-slate-900"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                <span>Scanning Schedules</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 9: Booking / Scheduling (7-Day Disciplines) */}
                {step === 9 && !isFinalizing && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="text-center">
                            <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 mb-2">
                                Please select your availability.
                            </h3>
                        </div>

                        {/* 7-Day Selector Tabs */}
                        <div className="flex justify-center pb-2 gap-2 snap-x overflow-x-auto no-scrollbar">
                            {bookingSlots.slice(0, 7).map((slot, i) => {
                                // Robust date parsing
                                let day = "??";
                                let dayName = "Day";
                                let monthAbbr = "";
                                try {
                                    const dateStr = slot.date.replace(/-/g, '/'); // normalize
                                    const dateObj = new Date(dateStr);
                                    if (!isNaN(dateObj.getTime())) {
                                        day = dateObj.getDate().toString();
                                        dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                        monthAbbr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                                    } else {
                                        // Specific slice for mm/dd formats if Date object is fussy
                                        const parts = dateStr.split('/');
                                        day = parts[1] || "??";
                                    }
                                } catch (e) {
                                    console.error("Date parse error", e);
                                }
                                
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDayIndex(i)}
                                        className={cn(
                                            "flex-shrink-0 snap-center w-20 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1",
                                            selectedDayIndex === i 
                                            ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                                        )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{monthAbbr}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{dayName}</span>
                                        <span className="text-xl font-black italic tracking-tighter">{day}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Slots for selected day */}
                        <div className="space-y-3 min-h-[200px]">
                            {bookingSlots[selectedDayIndex] ? (
                                <>
                                    <div className="flex items-center gap-4 text-slate-900 font-black uppercase italic text-xs tracking-widest pl-2">
                                        <Calendar className="w-4 h-4 text-premiumAccent" />
                                        Availability for {bookingSlots[selectedDayIndex].date}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {bookingSlots[selectedDayIndex].times.map((slotInfo, tIdx) => (
                                            <button
                                                key={tIdx}
                                                onClick={async () => {
                                                    setIsFinalizing(true);
                                                    
                                                    updateFormData({ 
                                                        selectedDate: bookingSlots[selectedDayIndex].date, 
                                                        selectedTime: slotInfo.time 
                                                    });
                                                    
                                                    // Send choice and row_number to UPDATE_BOOKING webhook (Fire and forget, but we handle the state)
                                                    submitToWebhook({
                                                        email: formData.email,
                                                        phone: formData.phone,
                                                        firstName: formData.firstName,
                                                        lastName: formData.lastName,
                                                        row_number: slotInfo.row_number,
                                                        selectedDate: bookingSlots[selectedDayIndex].date,
                                                        selectedTime: slotInfo.time,
                                                        status: 'CONFIRMED_BOOKING'
                                                    }, 'UPDATE_BOOKING');

                                                    // Artificial 2.5s wait before success
                                                    await new Promise(resolve => setTimeout(resolve, 2500));
                                                    
                                                    setIsFinalizing(false);
                                                    setStep(10);
                                                }}
                                                className="py-5 rounded-2xl border-2 border-slate-100 hover:border-premiumAccent hover:bg-premiumAccent/5 transition-all font-black text-lg text-slate-900"
                                            >
                                                {slotInfo.time}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No slots this day</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                setSkippedBooking(true);
                                setStep(10);
                            }}
                            className="w-full text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors py-2 italic"
                        >
                            Skip and have Kam call me instead
                        </button>
                    </div>
                )}

                {/* FINAL SUCCESS (Step 10) */}
                {step === 10 && (
                    <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6">
                            <CheckCircle className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 mb-4">
                            You&apos;re all set!
                        </h3>
                        
                        {formData.selectedDate && formData.selectedTime && !skippedBooking ? (
                            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 mb-10 max-w-sm mx-auto shadow-sm">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4 italic">Your Scheduled Appointment</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-3 text-2xl font-black italic tracking-tighter text-slate-900">
                                        <Calendar className="w-6 h-6 text-premiumAccent" />
                                        {formData.selectedDate}
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-2xl font-black italic tracking-tighter text-slate-900">
                                        <Clock className="w-6 h-6 text-premiumAccent" />
                                        {formData.selectedTime}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 mb-10 text-xl font-medium max-w-md mx-auto">
                                Kam will be in touch with you shortly to finalize your request.
                            </p>
                        )}
                        
                        {!skippedBooking && (
                            <div className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5">
                                <p className="text-slate-600 font-bold italic leading-snug">
                                    Expect an email confirmation for your booking. Please be on the lookout for <span className="text-slate-900 font-black">**(814) 449-0824 from Kam**</span> in case we have to double check any information.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 11: Finalizing Selection Loading Screen (between Step 9 and 10) */}
                {isFinalizing && (
                    <div className="text-center py-12 animate-in fade-in duration-500">
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-premiumAccent animate-spin" />
                            <CheckCircle className="absolute inset-x-0 inset-y-0 m-auto w-10 h-10 text-emerald-500 opacity-50" />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 mb-4">
                            Finalizing Selection...
                        </h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8 italic">
                            Securing your appointment for {formData.selectedDate} @ {formData.selectedTime}...
                        </p>
                        
                        <div className="max-w-xs mx-auto space-y-3">
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {renderTrustSignals()}
        </div>
    );
}
