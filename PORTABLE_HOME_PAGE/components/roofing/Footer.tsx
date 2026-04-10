import Link from 'next/link';
import { Facebook, ArrowRight } from 'lucide-react';
import LeadFormModal from './LeadFormModal';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brandBlack text-white pt-12 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
      {/* Premium Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-premiumAccent/30 to-transparent" />

      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] text-[30vw] font-black tracking-tighter uppercase select-none text-white/5 blur-[2px]">
          EJ
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8 mb-16 md:mb-24">
          <div className="md:col-span-2">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 pr-4">
              Ready to protect your home with <span className="text-premiumAccent">Erie&apos;s Best?</span>
            </h3>
            <LeadFormModal location="Footer Section">
              <Button
                size="lg"
                className="h-12 px-10 rounded-xl bg-premiumAccent hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-premiumAccent/20 group transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mb-8"
              >
                Get Free Inspection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </LeadFormModal>

            <Link href="/" className="inline-block">
              <img src="/logo.jpg" alt="EJ's Roofing" className="h-12 md:h-14 w-auto object-contain mb-6 rounded-lg cursor-pointer transition-transform hover:scale-105" />
            </Link>
            <p className="text-base text-slate-500 max-w-md font-medium leading-snug">
              25+ years of experience. Roofing, Siding, Gutter installation and repairs, remodeling done with great craftsmanship from only the best.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-premiumAccent tracking-wider">
              Service Area
            </h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li>
                <Link href="/service-areas/edinboro" className="hover:text-white transition-colors">Edinboro</Link>
              </li>
              <li>
                <Link href="/service-areas/girard" className="hover:text-white transition-colors">Girard</Link>
              </li>
              <li>
                <Link href="/service-areas/fairview" className="hover:text-white transition-colors">Fairview</Link>
              </li>
              <li>
                <Link href="/service-areas/wattsburg" className="hover:text-white transition-colors">Wattsburg</Link>
              </li>
            </ul>
          </div>



          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-premiumAccent tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex flex-col group cursor-default">
                <span className="text-[12px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-premiumAccent transition-colors">Location</span>
                <span className="text-white text-lg tracking-tight">Erie, Pennsylvania</span>
              </li>
              <li className="flex flex-col group">
                <span className="text-[12px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-premiumAccent transition-colors">Call Us</span>
                <a href="tel:8144490824" className="text-white text-xl font-bold tracking-tight hover:text-premiumAccent transition-colors">
                  (814) 449-0824
                </a>
              </li>
              <li className="flex flex-col group items-start">
                <span className="text-[12px] text-slate-500 uppercase tracking-widest mb-2 group-hover:text-premiumAccent transition-colors">Social</span>
                <a href="https://www.facebook.com/profile.php?id=61581730370659" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10">
                  <Facebook className="w-5 h-5 fill-current" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold mb-8 uppercase text-premiumAccent tracking-wider">
              Business Hours
            </h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex justify-between items-end group">
                <span className="text-slate-500 group-hover:text-white transition-colors">Mon-Fri</span>
                <span className="text-white">7:00 AM — 6:00 PM</span>
              </li>
              <li className="flex justify-between items-end group">
                <span className="text-slate-500 group-hover:text-white transition-colors">Saturday</span>
                <span className="text-white">8:00 AM — 4:00 PM</span>
              </li>
              <li className="flex justify-between items-end group">
                <span className="text-slate-500 group-hover:text-white transition-colors">Sunday</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
            &copy; {currentYear} EJ&apos;s ROOFING • LICENSE: PA006234
          </p>
          <div className="flex gap-6 md:gap-12">
            <a href="#privacy" className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] hover:text-white transition-colors">
              Privacy Protocol
            </a>
            <a href="#terms" className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] hover:text-white transition-colors">
              Terms of Engagement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
