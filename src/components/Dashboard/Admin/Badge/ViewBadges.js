import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Name", field: "badge_name", filter: true },
];

const ViewBadges = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [badgeList, setBadgeList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/badges/`,
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
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [authData?.accessToken]);

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : badgeList ? (
    <Table rowData={badgeList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Badges Available !!</h5>
  );
};

export default ViewBadges;
