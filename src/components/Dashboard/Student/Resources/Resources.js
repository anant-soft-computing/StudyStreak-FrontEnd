import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";

const Resources = () => {
  const { packageCount } = useLocation().state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);

  const category = JSON.parse(localStorage.getItem("course"))?.course_category;

  const data = resourcesList.flatMap((item) => {
    return item?.documents?.map((doc) => ({
      link: item?.link,
      document: doc?.document,
      description: doc?.description,
    }));
  });

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/resources/?is_paper=false",
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

        if (response?.status === 200) {
          const data = response?.data?.filter((item) =>
            item?.course.some((course) => course.category === category)
          );
          setResourceList(data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [category]);

  const columns = [
    {
      headerName: "No.",
      cellRenderer: (params) => params.rowIndex + 1,
      width: 85,
    },
    {
      headerName: "Description",
      field: "description",
      width: 570,
    },
    {
      headerName: "Video / Link",
      field: "link",
      resizable: true,
      filter: true,
      width: 400,
      cellRenderer: (params) => {
        return params.value !== "" ? (
          <button
            className="take-test"
            onClick={() => window.open(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
    {
      headerName: "Documents",
      field: "document",
      width: 400,
      cellRenderer: (params) => {
        return params.value !== "" ? (
          <button
            className="take-test"
            onClick={() => window.open(params.value)}
          >
            <i className="icofont-download" /> Download
          </button>
        ) : (
          "-"
        );
      },
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
                      <h4>Resources</h4>
                    </div>
                    <div className="row">
                      {packageCount === 0 ? (
                        <BuyCourse message="No Resources Available, Please Buy a Course !!" />
                      ) : isLoading ? (
                        <Loading />
                      ) : data.length > 0 ? (
                        <Table rowData={data} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Resources Available !!
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

export default Resources;
