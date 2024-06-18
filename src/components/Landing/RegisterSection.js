import React, { useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import video1 from "../../img/icon/video.png";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import register1 from "../../img/register/register__1.png";
import register2 from "../../img/register/register__2.png";
import register3 from "../../img/register/register__3.png";

const initialContactData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerContact = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialContactData;
  }
  return { ...state, [action.type]: action.value };
};

const RegisterSection = () => {
  const form = useRef();
  const [contactData, dispatchContact] = useReducer(
    reducerContact,
    initialContactData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!contactData.name.trim()) {
      setFormError("Name is Required");
      return false;
    }
    if (!contactData.email) {
      setFormError("Email Address is Required");
      return false;
    }
    if (!emailRegex.test(contactData.email)) {
      setFormError("Invalid Email Address");
      return false;
    }
    if (!contactData.phone) {
      setFormError("Phone Number is Required");
      return false;
    }
    if (!phoneRegex.test(contactData.phone)) {
      setFormError("Invalid Phone Number");
      return false;
    }
    if (!contactData.message.trim()) {
      setFormError("Message is Required");
      return false;
    }
    setFormStatus(initialSubmit);
    return true;
  };

  const resetForm = () => {
    dispatchContact({ type: "reset" });
    form.current.reset();
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .sendForm(
          "service_tfvd9vh",
          "template_i9sw0pd",
          form.current,
          "WrIPnVKmdHgT5K9Jc"
        )
        .then(
          (response) => {
            if (response.status === 200) {
              resetForm();
              toast.success("Email sent successfully");
            }
          },
          (error) => {
            toast.error("Something went wrong. Please try again later");
            console.error("FAILED...", error);
          }
        );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatchContact({ type: name, value });
  };

  return (
    <div className="registerarea sp_top_90">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
            <div className="registerarea__wraper">
              <div className="section__title registerarea__section__title">
                <div className="section__title__button">
                  <div className="default__small__button">Register Now</div>
                </div>
                <div className="section__title__heading heading__underline">
                  <h2>
                    Register Your Account Get Free Access To Online Courses
                  </h2>
                </div>
              </div>
              <div className="registerarea__content">
                <div className="registerarea__video">
                  <div className="video__pop__btn">
                    <Link
                      className="video-btn"
                      to="https://www.youtube.com/watch?v=vHdclsdkp28"
                    >
                      <img src={video1} alt="" />
                    </Link>
                  </div>
                  <div className="registerarea__para">
                    <p>
                      Learn Something new & Build Your Career From Anywhere In
                      The World
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
            <div className="registerarea__form">
              <div className="registerarea__form__heading">
                <h4>Fill Your Registration</h4>
              </div>
              <form id="contact-form" ref={form} onSubmit={sendEmail}>
                <input
                  className="register__input"
                  type="text"
                  placeholder="Your Name*"
                  name="name"
                  value={contactData.name}
                  onChange={handleInputChange}
                />
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      className="register__input"
                      type="email"
                      placeholder="Email Address*"
                      name="email"
                      value={contactData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-xl-6">
                    <input
                      className="register__input"
                      type="tel"
                      placeholder="Phone Number*"
                      name="phone"
                      value={contactData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <textarea
                  className="register__input textarea"
                  cols="30"
                  rows="10"
                  placeholder="Your message*"
                  name="message"
                  value={contactData.message}
                  onChange={handleInputChange}
                ></textarea>
                <div className="registerarea__button">
                  {formStatus.isError && (
                    <div className="text-danger mb-2">{formStatus.errMsg}</div>
                  )}
                  <button className="default__button">
                    Send
                    <i className="icofont-long-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="registerarea__img">
        <img className="register__1" src={register1} alt="register" />
        <img className="register__2" src={register2} alt="register" />
        <img className="register__3" src={register3} alt="register" />
      </div>
    </div>
  );
};

export default RegisterSection;
