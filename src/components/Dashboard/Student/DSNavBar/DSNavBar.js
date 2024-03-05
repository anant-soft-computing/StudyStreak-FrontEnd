import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const DSNavBar = () => {
  const [user, setUser] = useState();

  const getStudent = async () => {
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
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className="container-fluid full__width__padding">
      <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="dashboardarea__wraper">
            <div className="dashboardarea__img">
              <div className="dashboardarea__inner">
                <div className="dashboardarea__left">
                  <div className="dashboardarea__left__img">
                    <img src={user?.user_image} alt="" />
                  </div>
                  <div className="dashboardarea__left__content">
                    <h4>
                      {user?.user?.first_name} {user?.user?.last_name}
                    </h4>
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