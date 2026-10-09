import Hero from "@/components/choose-plan/Hero";
import Benefits from "@/components/choose-plan/Benefits";
import PlanSelector from "@/components/choose-plan/PlanSelector";
import FAQ from "@/components/choose-plan/FAQ";
import Footer from "@/components/home/Footer";


export default function ChoosePlanPage() {
  return (
    <>
    <main className="bg-white">
      {/* Hero */}
      <Hero />

      <div className="mx-auto max-w-[1070px] px-6 py-12">
        {/* Benefits */}
        <Benefits />

        {/* Plans */}
        <PlanSelector />

        {/* FAQ */}
        <FAQ />
      </div>
    </main>
    <Footer />
    </>
  );
}
