import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", width: 490 },
  { headerName: "Name", field: "title", filter: true, width: 490 },
  {
    headerName: "Points Required",
    field: "points_required",
    filter: true,
    width: 490,
  },
];

const ViewBadges = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [badgeList, setBadgeList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View Badge") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/gamification/badges/`,
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
          if (response?.status === 200) {
            const badgesWithNumbers = response?.data?.map((batch, index) => ({
              ...batch,
              no: index + 1,
            }));
            setBadgeList(badgesWithNumbers);
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
  ) : badgeList.length > 0 ? (
    <Table rowData={badgeList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Badges Available !!</h5>
  );
};

export default ViewBadges;
