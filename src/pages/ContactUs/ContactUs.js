import React, { useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

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

const ContactUs = () => {
  const form = useRef();
  const navigate = useNavigate();
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
              navigate("/");
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
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div>
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
        </div>
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="d-flex justify-content-center">
              <div className="col-xl-8 col-lg-8">
                <div className="blog__details__content__wraper">
                  <div className="blog__details__form">
                    <div className="blog__details__input__heading">
                      <h5>Send Us a Message</h5>
                    </div>
                    <form id="contact-form" ref={form} onSubmit={sendEmail}>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="blog__details__input">
                            <input
                              type="text"
                              placeholder="Your Name*"
                              name="name"
                              value={contactData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="blog__details__input">
                            <input
                              type="email"
                              placeholder="Email Address*"
                              name="email"
                              value={contactData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="blog__details__input">
                            <input
                              type="tel"
                              placeholder="Phone Number*"
                              name="phone"
                              value={contactData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="blog__details__input">
                            <textarea
                              cols="30"
                              rows="10"
                              placeholder="Your message*"
                              name="message"
                              value={contactData.message}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="blog__details__button">
                        {formStatus.isError && (
                          <div className="text-danger mb-2">
                            {formStatus.errMsg}
                          </div>
                        )}
                        <button className="default__button">Send</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
