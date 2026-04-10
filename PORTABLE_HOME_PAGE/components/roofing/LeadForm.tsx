'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadFormSchema, type LeadFormValues, formatPhoneNumber } from '@/lib/formValidation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { triggerLeadEvents } from '@/lib/analytics';
import { submitToWebhook } from '@/lib/webhooks';
import { toast } from 'sonner';

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      zipCode: '',
      roofAge: '',
    },
  });

  const phoneValue = watch('phone');
  const issueType = watch('issueType');
  const roofAge = watch('roofAge');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted);
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(['issueType', 'zipCode']);
      if (isValid) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      // FIRE AND FORGET - Webhook and Analytics
      // We do NOT want one to block the other if one fails.
      Promise.allSettled([
        triggerLeadEvents({
          email: '',
          phone: data.phone,
          zipCode: data.zipCode,
          firstName: data.fullName.split(' ')[0],
          lastName: data.fullName.split(' ').slice(1).join(' '),
        }, {
          issue_type: data.issueType,
          roof_age: data.roofAge
        }),
        submitToWebhook({
          fullName: data.fullName,
          phone: data.phone,
          zipCode: data.zipCode,
          issueType: data.issueType,
          roofAge: data.roofAge,
          location: 'Step-by-Step Lead Form'
        }, 'PRODUCTION').then(result => {
          if (result) {
            console.log('Webhook dispatched successfully via proxy');
          } else {
            console.warn('Webhook dispatch failed');
            toast.error('System delay: Retrying lead capture...');
          }
        })
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass p-8 rounded-2xl shadow-2xl border-premiumAccent/20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tighter uppercase italic">
          Report Scheduled!
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Thank you, <span className="font-bold">{watch('fullName')}</span>. We've received your request for a <span className="font-bold">{issueType?.replace('-', ' ')}</span> assessment.
          <br /><br />
          Our crew is notified. An expert will reach out to schedule your <span className="font-bold">Photo Report</span> within 2 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSuccess(false);
            setStep(1);
          }}
          className="border-slate-200 hover:bg-slate-50"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  const stepTitles = [
    'Stop The Leak Today',
    'Quick Assessment',
    'Get Your Photo Report'
  ];

  const stepSubs = [
    'Tell us what your home needs',
    'Help us prepare your specific crew',
    'Where should we send your report and estimate?'
  ];

  return (
    <div className="glass p-4 sm:p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-white/40 relative overflow-hidden group">
      {/* Internal Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-premiumAccent/5 blur-3xl rounded-full" />

      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100/50">
        <div
          className="h-full bg-gradient-to-r from-premiumAccent to-orange-500 transition-all duration-1000 ease-organic shadow-[0_0_15px_rgba(242,140,56,0.6)]"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="mb-10 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            {stepTitles[step - 1]}
          </h3>
          <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full tracking-[2px]">STEP {step}/3</span>
        </div>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-wide opacity-80">
          {stepSubs[step - 1]}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 gap-3">
              <Label className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-2">
                What can we help with?
              </Label>
              {[
                { id: 'active-leak', label: 'Active Roof Leak', icon: '💧' },
                { id: 'missing-shingles', label: 'Missing Shingles', icon: '🏠' },
                { id: 'storm-damage', label: 'Storm/Hail Damage', icon: '⛈️' },
                { id: 'roof-replacement', label: 'Full Replacement', icon: '🔨' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setValue('issueType', item.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${issueType === item.id
                    ? 'border-premiumAccent bg-premiumAccent/5 shadow-md scale-[1.02]'
                    : 'border-slate-100 hover:border-slate-300 bg-white/50'
                    }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`font-bold ${issueType === item.id ? 'text-slate-900' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
              {errors.issueType && (
                <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.issueType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-slate-800 font-bold text-sm uppercase tracking-wider">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                {...register('zipCode')}
                placeholder="Ex: 16503"
                maxLength={5}
                className="h-12 sm:h-14 bg-white/50 border-slate-200 focus:ring-2 focus:ring-premiumAccent/20 focus:border-premiumAccent text-base sm:text-lg font-medium"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.zipCode.message}</p>
              )}
            </div>

            <Button
              type="button"
              onClick={nextStep}
              className="w-full h-14 sm:h-16 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base sm:text-lg rounded-xl group"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 gap-3">
              <Label className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-2">
                How old is your roof (Approx)?
              </Label>
              {[
                { id: 'new', label: '1 - 5 years', desc: 'Recently installed' },
                { id: 'mature', label: '5 - 15 years', desc: 'Monitor for wear' },
                { id: 'old', label: '15 - 25 years', desc: 'Common for insurance issues' },
                { id: 'unknown', label: 'I am not sure', desc: 'We will help you check' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setValue('roofAge', item.id)}
                  className={`flex flex-col p-4 rounded-xl border-2 transition-all text-left ${roofAge === item.id
                    ? 'border-premiumAccent bg-premiumAccent/5 shadow-md scale-[1.02]'
                    : 'border-slate-100 hover:border-slate-300 bg-white/50'
                    }`}
                >
                  <span className={`font-bold ${roofAge === item.id ? 'text-slate-900' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-400">{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button
                type="button"
                onClick={nextStep}
                className="w-full h-14 sm:h-16 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base sm:text-lg rounded-xl group"
              >
                Almost Done
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-slate-500 font-bold text-sm uppercase tracking-widest hover:text-slate-800 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-800 font-bold text-sm uppercase tracking-wider">
                Full Name
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="Enter your name"
                className="h-12 sm:h-14 bg-white/50 border-slate-200 focus:ring-2 focus:ring-premiumAccent/20 focus:border-premiumAccent text-base sm:text-lg font-medium"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="phone" className="text-slate-800 font-bold text-sm uppercase tracking-wider">
                  Phone Number
                </Label>
                <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure Connection
                </span>
              </div>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                onChange={handlePhoneChange}
                value={phoneValue || ''}
                placeholder="(555) 000-0000"
                className="h-12 sm:h-14 bg-white/50 border-slate-200 focus:ring-2 focus:ring-premiumAccent/20 focus:border-premiumAccent text-base sm:text-lg font-medium"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.phone.message}</p>
              )}
              <p className="text-[10px] text-slate-400 italic mt-1 px-1">
                * We hate spam too. We only call to schedule your expert report.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 sm:h-16 bg-premiumAccent hover:bg-orange-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-premiumAccent/25 animate-premium-glow transition-all transform active:scale-[0.98] uppercase italic tracking-tighter"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    PREPARING YOUR REPORT...
                  </>
                ) : (
                  'Get My Free Photo Report'
                )}
              </Button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full text-slate-500 font-bold text-sm uppercase tracking-widest hover:text-slate-800 transition-colors"
              >
                ← Back to assessment
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
          ⚡ 2-HOUR RESPONSE GUARANTEED
        </p>

      </form>
    </div>
  );
}
