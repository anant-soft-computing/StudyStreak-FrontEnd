import React, { useEffect, useState } from "react";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";
import ajaxCall from "../../../../../helpers/ajaxCall";

const Listening = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listeningData, setListeningData] = useState({
    SST: {},
    CMA: {},
    LFIB: {},
    HCS: {},
    CSA: {},
    SMW: {},
    HIW: {},
    WFD: {},
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/ct/ielts/practice-tests/?exam_type=Listening&category=PTE`,
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
          setListeningData({
            SST: response.data.find(
              ({ sub_category }) => sub_category === "SST"
            ),
            CMA: response.data.find(
              ({ sub_category }) => sub_category === "CMA"
            ),
            LFIB: response.data.find(
              ({ sub_category }) => sub_category === "LFIB"
            ),
            HCS: response.data.find(
              ({ sub_category }) => sub_category === "HCS"
            ),
            CSA: response.data.find(
              ({ sub_category }) => sub_category === "CSA"
            ),
            SMW: response.data.find(
              ({ sub_category }) => sub_category === "SMW"
            ),
            HIW: response.data.find(
              ({ sub_category }) => sub_category === "HIW"
            ),
            WFD: response.data.find(
              ({ sub_category }) => sub_category === "WFD"
            ),
          });
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (sub_category, examId) => {
    const url =
      sub_category === "SST" || sub_category === "WFD"
        ? `/PTE/IELTS/Listening/SST/WFD/${examId}`
        : sub_category === "HIW"
        ? `/PTE/IELTS/Listening/HIW/${examId}`
        : `/PTE/IELTS/Listening/${sub_category}/${examId}`;
    window.open(url, "_blank");
  };

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
                      <h4>PTE Listening</h4>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : Object.values(listeningData).some(
                          (tests) => Object.keys(tests).length > 0
                        ) ? (
                        Object.values(listeningData)
                          .filter((data) => Object.keys(data).length > 0)
                          .map((data, index) => (
                            <div
                              className="col-xl-4 column__custom__class"
                              key={index}
                              onClick={() =>
                                handleCardClick(data.sub_category, data.id)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div className="gridarea__wraper text-center card-background">
                                <div className="gridarea__content p-3 m-2">
                                  <div className="gridarea__heading">
                                    <h3 className="text-center">
                                      {data?.IELTS?.Name}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <h5 className="text-center text-danger">
                          No Listening Tests Available !!
                        </h5>
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

export default Listening;
