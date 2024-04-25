import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Name", field: "badge_name", filter: true },
];

const ViewBadges = () => {
  const [badgeList, setBadgeList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/badges/`,
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
          const badgesWithNumbers = response?.data?.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setBadgeList(badgesWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return <Table rowData={badgeList} columnDefs={columns} />;
};

export default ViewBadges;