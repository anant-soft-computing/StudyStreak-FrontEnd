import Footer from "../../components/Footer/Footer";
import AboutSection from "../../components/Landing/AboutSection";
import Scrollar from "../../components/Landing/Scrollar";
import BrandSection from "../../components/Landing/BrandSection";
import CounterArea from "../../components/Landing/CounterArea";
import HeroBanner from "../../components/Landing/HeroBanner";
import Path from "../../components/Landing/Path";
import PopulerArea from "../../components/Landing/PopularArea";
import RegisterSection from "../../components/Landing/RegisterSection";
import NavBar from "../../components/NavBar/NavBar";
import MobileTopBar from "../../components/TopBar/MobileTopBar";
import TopBar from "../../components/TopBar/TopBar";

const Main = () => {
  return (
    <div className="main_wrapper overflow-hidden">
      <TopBar />
      <MobileTopBar />
      <NavBar />
      <HeroBanner />
      <BrandSection />
      <Scrollar />
      <Path />
      <CounterArea />
      <PopulerArea />
      <RegisterSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Main;
