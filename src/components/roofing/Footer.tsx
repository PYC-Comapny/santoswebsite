import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight } from 'lucide-react';
import LeadFormModal from './LeadFormModal';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-900 pt-12 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
      {/* Premium Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8CC63F]/30 to-transparent" />

      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] text-[30vw] font-black tracking-tighter uppercase select-none text-black/5 blur-[2px]">
          FIX ROOFING
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8 mb-16 md:mb-24">
          <div className="md:col-span-2">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 pr-4 text-slate-900">
              Ready to protect your home with <span className="text-[#8CC63F]">the Best in Tampa?</span>
            </h3>
            <LeadFormModal location="Footer Section">
              <Button
                size="lg"
                className="h-12 px-10 rounded-xl bg-[#8CC63F] hover:bg-[#8CC63F]/90 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-[#8CC63F]/20 group transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mb-8"
              >
                Get Free Inspection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </LeadFormModal>

            <Link href="/" className="inline-block group">
              <div className="relative h-16 w-48 md:h-24 md:w-64 overflow-hidden mb-6">
                <NextImage 
                  src="/logo.png" 
                  alt="Fix Roofing LLC" 
                  fill
                  className="object-contain rounded-lg cursor-pointer transition-transform hover:scale-105" 
                />
              </div>
            </Link>
            <p className="text-base text-slate-600 max-w-md font-medium leading-snug">
              25+ years of experience. Roofing, Siding, Gutter installation and repairs, remodeling done with great craftsmanship from only the best.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-[#8CC63F] tracking-wider">
              Service Area
            </h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              {['Tampa', 'Brandon', 'Riverview', 'Wesley Chapel'].map((city) => (
                <li key={city}>
                  <LeadFormModal location={`Footer - ${city}`}>
                    <button className="hover:text-[#8CC63F] transition-colors text-left uppercase text-[10px] font-black tracking-widest">
                      {city}
                    </button>
                  </LeadFormModal>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-[#8CC63F] tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-6 text-slate-500 font-medium">
              <li className="flex flex-col group cursor-default">
                <span className="text-[12px] text-slate-400 uppercase tracking-widest mb-1 group-hover:text-[#8CC63F] transition-colors">Location</span>
                <span className="text-slate-900 text-lg tracking-tight">4818 NORTH GRADY AV TAMPA, FL 33614</span>
              </li>
              <li className="flex flex-col group">
                <span className="text-[12px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-[#8CC63F] transition-colors">Call Us</span>
                <a href="tel:8137338521" className="text-slate-900 text-xl font-bold tracking-tight hover:text-[#8CC63F] transition-colors">
                  (813) 733-8521
                </a>
              </li>
              <li className="flex flex-col group">
                <span className="text-[12px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-[#8CC63F] transition-colors">Email</span>
                <a href="mailto:office@fixroofingllc.com" className="text-slate-900 text-lg font-bold tracking-tight hover:text-[#8CC63F] transition-colors">
                  office@fixroofingllc.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-[#8CC63F] tracking-wider">
              Business Hours
            </h4>
            <ul className="space-y-6 text-slate-500 font-medium">
              <li className="flex justify-between items-end group">
                <span className="text-slate-400 group-hover:text-slate-900 transition-colors">Mon-Fri</span>
                <span className="text-slate-900 font-bold">9:00 AM — 5:00 PM</span>
              </li>
              <li className="flex justify-between items-end group">
                <span className="text-slate-400 group-hover:text-slate-900 transition-colors">Sat-Sun</span>
                <span className="text-slate-900 font-bold">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            &copy; {currentYear} FIX ROOFING LLC • LICENSE: CCC1336136
          </p>
          <div className="flex gap-6 md:gap-12">
            <a href="#privacy" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-900 transition-colors">
              Privacy Protocol
            </a>
            <a href="#terms" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-900 transition-colors">
              Terms of Engagement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
