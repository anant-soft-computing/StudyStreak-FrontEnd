import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user came from form submission
    const formSubmitted = sessionStorage.getItem("formSubmitted");
    
    if (!formSubmitted) {
      // Redirect to home if accessed directly
      navigate("/", { replace: true });
      return;
    }
    
    // Clear the flag immediately after checking
    sessionStorage.removeItem("formSubmitted");
    
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Facebook Pixel tracking
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle size={80} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-700 mb-6">
          Your message has been sent successfully.
        </p>
        
        <p className="text-neutral-600 mb-8">
          Our team will review your inquiry and get back to you within 24 hours. 
          We appreciate your interest in our IELTS preparation programs!
        </p>
        
        <div className="border-t border-neutral-200 pt-8 mb-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            What's Next?
          </h2>
          <ul className="text-left space-y-3 max-w-md mx-auto">
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-neutral-700">Check your email for a confirmation message</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-neutral-700">Our team will contact you within 24 hours</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-neutral-700">Prepare any questions you'd like to discuss</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          >
            Go Back
          </button>
          <a
            href="/"
            className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 inline-block"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
