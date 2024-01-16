import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";

const DSNavBar = () => {
  const [data, setData] = useState();
  const authData = useSelector((state) => state.authStore);

  const getData = async () => {
    try {
      const response = await ajaxCall(
        `/studentview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setData(response.data[0]);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getData();
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
                    <img src={data?.user_image} alt="" />
                  </div>
                  <div className="dashboardarea__left__content">
                    <h4>{data?.user?.first_name} {data?.user?.last_name}</h4>
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
