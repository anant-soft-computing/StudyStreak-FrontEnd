import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "//code.tidio.co/l4otkjmkeqnqu0g5wnjg17ibrfhfnxqw.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return null; // This component doesn't render anything visible
};

export default TidioChat;
