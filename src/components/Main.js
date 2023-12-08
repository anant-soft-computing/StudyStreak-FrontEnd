import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import BrandSection from "../components/BrandSection";
import CounterArea from "../components/CounterArea";
import PopulerArea from "../components/PopularArea";
import GridSection from "../components/GridSection";
import RegisterSection from "../components/RegisterSection";
import AboutSection from "../components/AboutSection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <HeroBanner />
      <BrandSection />
      <GridSection />
      <PopulerArea />
      <CounterArea />
      <RegisterSection />
      <AboutSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default Main;
