import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import Tab from "../../../UI/Tab";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const FreeMiniTest = () => {
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Reading");

  const takeTest = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          window.open(
            `/${
              activeTab !== "Speaking" ? "live-exam" : "live-speaking-exam"
            }/${activeTab}/${params.data.id}`,
            "_blank"
          )
        }
      >
        Take Test
      </button>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "Speaking") {
          const speakingBlocksResponse = await ajaxCall(
            "/speaking-block/",
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
          if (speakingBlocksResponse.status === 200) {
            const allSpeakingData = speakingBlocksResponse?.data
              ?.filter((item) => item.block_threshold === 0)
              ?.map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setTestData(allSpeakingData);
          }
        } else {
          const examBlocksResponse = await ajaxCall(
            `/exam-blocks/?fields=id,block_type,exam_category,exam_name,no_of_questions,exam_type&exam_type=${activeTab}`,
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
          if (examBlocksResponse.status === 200) {
            const mockTestData = examBlocksResponse?.data?.filter(
              ({ block_type }) => block_type === "Assignments"
            );
            setTestData(mockTestData);
          }
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: takeTest,
      filter: true,
      width: 310,
    },
    { headerName: "Name", field: "exam_name", filter: true, width: 380 },
    {
      headerName: "No. Of Questions",
      field: "no_of_questions",
      filter: true,
      width: 380,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
      cellRenderer: (params) => params.data.exam_category || "-",
      width: 380,
    },
  ];
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
                      <h4>Free Mini Test</h4>
                    </div>
                    <div className="row">
                      <Tab
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        {isLoading ? (
                          <Loading text="Loading..." color="primary" />
                        ) : testData.length > 0 ? (
                          <Table rowData={testData} columnDefs={columns} />
                        ) : (
                          <h5 className="text-center text-danger">{`No ${activeTab} Tests Available !!`}</h5>
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
    </div>
  );
};

export default FreeMiniTest;
