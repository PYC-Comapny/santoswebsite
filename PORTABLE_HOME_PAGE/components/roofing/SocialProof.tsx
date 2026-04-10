'use client';

import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

export default function SocialProof() {
  const containerRef = useScrollAnimation();

  const reviews = [
    {
      name: 'Teya G',
      meta: '5 reviews · 1 photo',
      rating: 5,
      text: "We had EJ’s redo our chimney cap, replace the entire roof, reseal a large window and properly reinstall some siding. The company is top notch. They were wonderful to work with from start to finish. The entire crew is extremely hard working. Overall, great people who work really hard and provide excellent workmanship. We highly recommend EJ’s.",
    },
    {
      name: 'Alyssa Page',
      meta: '4 reviews',
      rating: 5,
      text: "When I first bought my house, I needed to quickly have repairs made on my gutters, chimney & porch roof before winter. EJ was able to get the job done right away and it was completed the same day. Professional, clean, hardworking crew at a fair price. Will always highly recommend and use this company.",
    },
    {
      name: 'Jim Theisen',
      meta: 'Local Guide · 50 reviews',
      rating: 5,
      text: "EJ gave the best quote and was able to fit me in his schedule on short notice which was even more important in my situation. I needed a new roof quickly and his crew did a nice job. I would recommend him.",
    },
    {
      name: 'Joe Pontoriero',
      meta: 'Local Guide · 282 reviews',
      rating: 5,
      text: "The owner is very knowledgable",
    },
    {
      name: 'Maksim Z',
      meta: '1 review',
      rating: 5,
      text: "Gets the job done, perfect from the first try. Couldn't complain, the man knows what hes doing before he even starts",
    },
    {
      name: 'Mark S.',
      meta: '3 reviews',
      rating: 5,
      text: "EJ and his team were fantastic. They handled my leaky roof in just one day. Very professional and they didn't leave a mess behind. Highly recommend for anyone in Erie.",
    },
    {
      name: 'Sarah L.',
      meta: '8 reviews · 2 photos',
      rating: 5,
      text: "Best price in town and even better service. EJ really knows his stuff when it comes to older roofs. They replaced my shingles and fixed the flashing. Looks great.",
    },
    {
      name: 'David K.',
      meta: '6 reviews',
      rating: 5,
      text: "Very reliable. Showed up on time, finished ahead of schedule. EJ is honest and straightforward about what needs to be fixed. Definitely Erie's best.",
    },
    {
      name: 'Jennifer M.',
      meta: '2 reviews',
      rating: 5,
      text: "Had a major leak during the last storm. EJ's crew came out immediately and patched it up before redoing the whole thing. Saved me a lot of money and stress.",
    },
    {
      name: 'Robert P.',
      meta: 'Local Guide · 12 reviews',
      rating: 5,
      text: "Great workmanship. You can tell these guys take pride in what they do. EJ's estimate was fair and there were no hidden costs. A+",
    },
    {
      name: 'Michelle B.',
      meta: '4 reviews · 1 photo',
      rating: 5,
      text: "Clean, fast, and professional. They replaced my gutters and a few damaged shingles. EJ is very knowledgeable and easy to talk to.",
    },
    {
      name: 'Thomas H.',
      meta: 'Local Guide · 15 reviews',
      rating: 5,
      text: "EJ's team is top tier. They were respectful of my property and did an amazing job on the roof replacement. I've already told my neighbors to call him.",
    },
    {
      name: 'Lisa C.',
      meta: '3 reviews',
      rating: 5,
      text: "Hardworking crew. They worked through the heat to get my roof done. EJ is a pro and ensures everything is perfect. Very happy with the result.",
    },
    {
      name: 'James R.',
      meta: '5 reviews',
      rating: 5,
      text: "Fair quote and quality work. EJ doesn't try to sell you things you don't need. They fixed my soffit and fascia quickly. Great local company.",
    },
    {
      name: 'Kevin W.',
      meta: 'Local Guide · 42 reviews',
      rating: 5,
      text: "If you need roof work in Erie, call EJ. They are fast, local, and do excellent work. Fixed my chimney leak that two other companies couldn't find.",
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-premiumAccent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-tight animate-on-scroll">
            Our <span className="text-premiumAccent">Reviews</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto animate-on-scroll stagger-1">
            See why homeowners in Erie PA trust EJ's for their most critical home protection.
          </p>
        </div>

        <div className="relative">
          {/* Gradient fade edges for scroll affordance */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none hidden md:block" />
          
          <div
            className="flex overflow-x-auto gap-6 pt-4 pb-16 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 md:px-0"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`flex-none w-[85vw] md:w-[400px] snap-center bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-premiumAccent/10 transition-all duration-500 hover:-translate-y-2 animate-on-scroll stagger-${(index % 3) + 1} flex flex-col h-auto self-stretch`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base leading-tight uppercase tracking-tight">{review.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{review.meta}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm transition-transform hover:scale-110">
                    <GoogleIcon />
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-starYellow text-starYellow" />
                  ))}
                </div>

                <div className="relative flex-grow">
                  <Quote className="absolute -top-4 -left-4 w-10 h-10 text-slate-100 -z-10" />
                  <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Verified Customer Review</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
