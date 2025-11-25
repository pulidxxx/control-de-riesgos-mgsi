import { HeroSection } from '@/components/hero-section'
import { IntroSection } from '@/components/intro-section'
import { NavigationMenu } from '@/components/navigation-menu'
import { AssetsSection } from '@/components/assets-section'
import { RisksSection } from '@/components/risks-section'
import { HeatMapSection } from '@/components/heatmap-section'
import { FindingsSection } from '@/components/findings-section'
import { RecommendationsSection } from '@/components/recommendations-section'
import { ChartsSection } from '@/components/charts-section'
import { Footer } from '@/components/footer'
import { ApplicabilitySection } from '@/components/applicability-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavigationMenu />
      <HeroSection />
      <IntroSection />
      <AssetsSection />
      <RisksSection />
      <HeatMapSection />
      <FindingsSection />
      <RecommendationsSection />
      <ChartsSection />
      <ApplicabilitySection />
      <Footer />
    </main>
  )
}
