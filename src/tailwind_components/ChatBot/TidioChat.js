import { useEffect } from "react";

const TidioChat = () => {
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/dud7zkgb1lvp0wedmcglyarism3gszye.js";
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TidioChat;
