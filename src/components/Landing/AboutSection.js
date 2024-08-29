import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import video from "../../video/home.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ajaxCall from "../../helpers/ajaxCall";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

const AboutSection = () => {
  const [testimonialList, setTestimonialList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/testimonial/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setTestimonialList(response?.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        console.error("Error");
      }
    })();
  }, []);

  return (
    <div className="testimonialarea__3">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="section__title__2">
              <div className="section__small__title">
                <span>Student Testimonial</span>
              </div>
              <div className="section__title__heading__2 section__title__heading__3 heading__fontsize__2">
                <h2>What our students are saying</h2>
              </div>
            </div>

            <Slider {...sliderSettings}>
              {testimonialList?.map((item, index) => (
                <div className="testimonialarea__paragraph__3" key={index}>
                  <p className="testimonial__quote">
                    <i className="icofont-quote-left quote__left"></i>
                    {item?.description}
                    <i className="icofont-quote-right quote__right"></i>
                  </p>
                  <div className="testimonialarea__person__3">
                    <div className="testimonial__img__3">
                      <img src={item?.image} alt="Amit Patel" />
                    </div>
                    <div className="testimonial__name">
                      <h6>
                        <div>{item?.name}</div>
                      </h6>
                      <span>{item?.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            style={{ border: "2px solid #01579b" }}
          >
            <video
              controls
              poster="https://www.espionline.in/assets/images/poster.jpg"
              style={{ marginLeft: "-5px", marginTop: "45px" }}
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
