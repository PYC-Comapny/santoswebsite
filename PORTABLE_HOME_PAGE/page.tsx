import Header from '@/components/roofing/Header';
import HeroSection from '@/components/roofing/HeroSection';
import SingleTestimonial from '@/components/roofing/SingleTestimonial';
import TrustBadges from '@/components/roofing/TrustBadges';
import LogoTicker from '@/components/roofing/LogoTicker';
import TransformationSlider from '@/components/roofing/TransformationSlider';
import RecentProjects from '@/components/roofing/RecentProjects';
import CostOfWaiting from '@/components/roofing/CostOfWaiting';
import SocialProof from '@/components/roofing/SocialProof';
import BlogPreview from '@/components/roofing/BlogPreview';
import FAQ from '@/components/roofing/FAQ';
import ServicesSection from '@/components/roofing/ServicesSection';
import TrustComparison from '@/components/roofing/TrustComparison';
import Footer from '@/components/roofing/Footer';

import { servicesData } from '@/lib/services-data';

export default function Home() {
  const masterRoofingData = servicesData['master-roofing'];
  const chartData = [
    { name: 'Baseline', decay: 0, color: '#10B981', label: 'Healthy Structure' },
    ...masterRoofingData.waitingMatrix.map((stage: any) => ({
      name: stage.title,
      decay: stage.decayValue,
      color: stage.id === 0 ? '#10B981' : stage.id === 1 ? '#F59E0B' : '#EF4444',
      label: stage.problem
    }))
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <LogoTicker />
        <SingleTestimonial />
        <TrustComparison />

        <TrustBadges isHome />
        <ServicesSection />
        <RecentProjects />
        <TransformationSlider />
        <CostOfWaiting 
          isHome
          data={chartData} 
          stages={masterRoofingData.waitingMatrix}
          prefix=""
          suffix="%"
          windowTitle="System Health Status: Analysis"
          showHeader={true}
          showCTA={true}
          title="Waiting Won't Save You"
          subtitle="“Removing the fear of making a costly mistake.”"
        />
        <SocialProof />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />


    </div>
  );

}

