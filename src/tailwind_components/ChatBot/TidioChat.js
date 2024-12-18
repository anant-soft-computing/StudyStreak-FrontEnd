import { useEffect } from "react";

const TidioChat = () => {

  useEffect(() => {
    const tidioScriptId = "tidio-chat-script";

    if (!document.getElementById(tidioScriptId)) {
      const script = document.createElement("script");
      script.id = tidioScriptId;
      script.src = "//code.tidio.co/dud7zkgb1lvp0wedmcglyarism3gszye.js";
      script.async = true;

      document.body.appendChild(script);
    } else if (window.tidioChatApi) {
      window.tidioChatApi.show();
    }

    return () => {
      if (window.tidioChatApi) {
        window.tidioChatApi.hide();
      }
    };
  }, []);

  return null;
};

export default TidioChat;
