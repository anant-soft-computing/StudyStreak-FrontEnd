import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewNotice = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticeList, setNoticeList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const checkLink = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((item, index) =>
      urlPattern.test(item) ? (
        <a
          href={item}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          [link]
        </a>
      ) : (
        item
      )
    );
  };

  const columns = [
    {
      headerName: "No.",
      field: "no",
      width: 60,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Notice",
      field: "notice",
      filter: true,
      cellRenderer: (params) => checkLink(params.value),
      width: 430,
    },
    {
      headerName: "Expiry Date",
      field: "expiry_date",
      filter: true,
      width: 150,
    },
    {
      headerName: "Student",
      field: "student",
      resizable: true,
      filter: true,
      width: 300,
    },
    {
      headerName: "Course",
      field: "course",
      resizable: true,
      filter: true,
      width: 300,
    },
    {
      headerName: "Batch",
      field: "batch",
      resizable: true,
      filter: true,
      width: 300,
    },
  ];

  useEffect(() => {
    if (activeTab === "View Notice") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/noticeboard-list/",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.accessToken}`,
              },
              method: "GET",
            },
            8000
          );
          if (response.status === 200) {
            const noticeData = response.data.map((item, index) => ({
              notice: item.notice,
              expiry_date: item.expiry_date,
              batch:
                item?.batch?.length > 0
                  ? item?.batch?.map((batch) => batch?.batch_name).join(", ")
                  : "-",
              student:
                item?.student?.length > 0
                  ? item?.student
                      .map(
                        (student) =>
                          `${student?.user?.first_name} ${student?.user?.last_name}`
                      )
                      .join(", ")
                  : "-",
              course:
                item?.course?.length > 0
                  ? item?.course
                      .map((course) => course?.Course_Title)
                      .join(", ")
                  : "-",
            }));
            setNoticeList(noticeData);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeTab, authData?.accessToken]);

  return isLoading ? (
    <Loading />
  ) : noticeList.length > 0 ? (
    <Table rowData={noticeList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Notice Available !!</h5>
  );
};

export default ViewNotice;
