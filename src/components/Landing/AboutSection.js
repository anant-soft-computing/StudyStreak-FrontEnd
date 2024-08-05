import React from "react";
import Slider from "react-slick";
import video from "../../video/home.mp4";
import about1 from "../../img/about/about1.png";
import about2 from "../../img/about/about2.png";
import about3 from "../../img/about/about3.png";
import about4 from "../../img/about/about4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonial = [
  {
    img: about1,
    name: "Amit Patel",
    comment:
      "I never took a online training slot before but I will highly recommend this type of training that’s been provided ESPI through their portal. I felt relaxed and at a nice pace that I feel I came away with lots of dedication from Faculties. Thank you!",
    position: "Student",
  },
  {
    img: about2,
    name: "Darshan Patel",
    comment:
      "I have completed my ielts with a good score of Overall score 6.5 and indivudual score: L: 7 , R:7 , W:6 , S:6 and behind this, I got a very supportive faculty and to score good it is necessary to have one and I got it from espi . Lastly, I want to thank Shivani mam,  Ishani mam,  who have been supporting and making efforts for me with my Ielts.",
    position: "Student",
  },
  {
    img: about3,
    name: "Paras Shemrudkar",
    comment:
      "Overall: 6.5. Listening: 8, Reading:- 6.5, Writing:- 6.0, Speaking: 6.0. Thank you ESPI team for providing me splendid coaching with friendly and supportive environment. Thanks again ESPI.",
    position: "Student",
  },
  {
    img: about4,
    name: "Hemang Pandya",
    comment:
      "Overall: 6.0. I Patel Parth DineshKumar. The video lessons are really good and helped me to understand many critical issues very easily. It was a great journey.",
    position: "Student",
  },
];

const AboutSection = () => {
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
              {testimonial.map((item, index) => (
                <div className="testimonialarea__paragraph__3" key={index}>
                  <p className="testimonial__quote">
                    <i className="icofont-quote-left quote__left"></i>
                    {item.comment}
                    <i class="icofont-quote-right quote__right"></i>
                  </p>

                  <div className="testimonialarea__person__3">
                    <div className="testimonial__img__3">
                      <img src={item.img} alt="Amit Patel" />
                    </div>
                    <div className="testimonial__name">
                      <h6>
                        <div>{item.name}</div>
                      </h6>
                      <span>{item.position}</span>
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
