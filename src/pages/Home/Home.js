import AboutSection from "../../components/Landing/AboutSection";
import Scrollar from "../../components/Landing/Scrollar";
import BrandSection from "../../components/Landing/BrandSection";
import CounterArea from "../../components/Landing/CounterArea";
import HeroBanner from "../../components/Landing/HeroBanner";
import Path from "../../components/Landing/Path";
import PopulerArea from "../../components/Landing/PopularArea";
import RegisterSection from "../../components/Landing/RegisterSection";
import MobileTopBar from "../../components/TopBar/MobileTopBar";

const Main = () => {
  return (
    <div className="main_wrapper overflow-hidden">
      <MobileTopBar />
      <HeroBanner />
      <BrandSection />
      <Scrollar />
      <Path />
      <CounterArea />
      <PopulerArea />
      <RegisterSection />
      <AboutSection />
    </div>
  );
};

export default Main;
