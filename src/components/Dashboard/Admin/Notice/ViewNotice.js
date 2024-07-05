import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 60 },
  { headerName: "Notice", field: "notice", filter: true, width: 600 },
  { headerName: "Expiry Date", field: "expiry_date", filter: true },
];

const ViewNotice = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticeList, setNoticeList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View Notice") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/noticeboard/`,
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
            console.log("notice", response.data);
            const noticeWithNumbers = response?.data?.map((item, index) => ({
              ...item,
              no: index + 1,
            }));
            setIsLoading(false);
            setNoticeList(noticeWithNumbers);
          } else {
            setIsLoading(false);
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
    <Loading text="Loading..." color="primary" />
  ) : noticeList.length > 0 ? (
    <Table rowData={noticeList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Notice Available !!</h5>
  );
};

export default ViewNotice;