import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";

const Reading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState({
    Reading: [],
  });

  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(`/PTE-Reading/IELTS/${key}/${data.id}`, "_blank");
        }
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/?exam_type=Reading&category=PTE`,
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
          const { data } = response;
          const filteredData = {
            Reading: data.filter(
              ({ exam_type, IELTS }) =>
                exam_type === "Reading" && !IELTS?.Name?.includes("Diagnostic")
            ),
          };
          setTestData(filteredData);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>PTE Reading</h4>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        testData?.Reading.map((data, index) => (
                          <div className="col-lg-2 col-md-6 col-12" key={index}>
                            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling">
                              <div className="gridarea__content ">
                                <div className="gridarea__heading mt-3">
                                  <h3 className="text-center">
                                    <div>{data?.IELTS?.Name}</div>
                                  </h3>
                                </div>
                              </div>
                              <div>
                                <div className="d-flex justify-content-center mt-2 mb-3">
                                  <button
                                    className="btn-sm default__button"
                                    onClick={() => handleClick(data)}
                                  >
                                    Take Test
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
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

export default Reading;
