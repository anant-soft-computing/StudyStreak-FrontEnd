import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no", width: 130 },
  { headerName: "Name", field: "title", filter: true, width: 410 },
  { headerName: "Description", field: "description", filter: true, width: 410 },
  {
    headerName: "Points Required",
    field: "points_required",
    filter: true,
    width: 250,
  },
  {
    headerName: "Gamification Items",
    field: "gamification_items.length",
    filter: true,
    width: 250,
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
            setIsLoading(false);
            setBadgeList(badgesWithNumbers);
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
  ) : badgeList.length > 0 ? (
    <Table rowData={badgeList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Badges Available !!</h5>
  );
};

export default ViewBadges;
