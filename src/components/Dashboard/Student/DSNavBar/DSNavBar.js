import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const DSNavBar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/studentview/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setUser(response.data[0]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="row">
        <div>
          <div>
            <div>
              <div className="dashboardarea__inner">
                <div className="dashboardarea__left">
                  <div className="dashboardarea__left__img">
                    <img src={user?.user_image} alt="" />
                  </div>
                  <div className="dashboardarea__left__content">
                    <h4>{user?.user?.first_name}</h4>
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

export default DSNavBar;
