import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { SampleStories } from "@/components/landing/sample-stories"
import { HowItWorks } from "@/components/landing/how-it-works"
import { CategoriesPreview } from "@/components/landing/categories-preview"
import { SocialProof } from "@/components/landing/social-proof"
import { WhatsAppGallery } from "@/components/landing/whatsapp-gallery"
import { AboutMenachem } from "@/components/landing/about-menachem"
import { PricingSection } from "@/components/landing/pricing-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SampleStories />
        <HowItWorks />
        <CategoriesPreview />
        <SocialProof />
        <WhatsAppGallery />
        <AboutMenachem />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
