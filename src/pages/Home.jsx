import AboutSection from "../components/AboutSection";
import CtaBanner from "../components/CtaBanner";
import Hero from "../components/Hero";
import PortfolioSection from "../components/PortfolioSection";
import ProcessSection from "../components/ProcessSection";
import ServicesSection from "../components/ServicesSection";

function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <PortfolioSection />
      <CtaBanner />
    </>
  );
}

export default Home;
