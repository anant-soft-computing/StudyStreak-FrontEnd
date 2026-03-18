import AboutSection from "../../components/Landing/AboutSection";
import BrandSection from "../../components/Landing/BrandSection";
import CounterArea from "../../components/Landing/CounterArea";
import HeroBanner from "../../components/Landing/HeroBanner";
import Path from "../../components/Landing/Path";
import PopulerArea from "../../components/Landing/PopularArea";
import RegisterSection from "../../components/Landing/RegisterSection";

const Main = () => {
  return (
    <div className="main_wrapper overflow-hidden">
      <HeroBanner />
      <BrandSection />
      <Path />
      <CounterArea />
      <PopulerArea />
      <RegisterSection />
      <AboutSection />
    </div>
  );
};

export default Main;
