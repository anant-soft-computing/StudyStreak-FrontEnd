import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  "No.",
  "Name",
  "Package",
  "Start Date",
  "End Date",
  "Start Time",
  "End Time",
];

const ViewBatches = () => {
  const [batchList, setBatchList] = useState([]);

  const getBatches = async () => {
    try {
      const response = await ajaxCall(
        `/batchview`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );

      if (response?.status === 200) {
        setBatchList(response?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <div className="dashboard__table table-responsive">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {batchList?.map((batchItem, index) => (
            <tr
              key={index + 1}
              className={`${index % 2 === 0 ? "" : "dashboard__table__row"}`}
            >
              <th>
                <div>{index + 1}.</div>
              </th>
              <td>{batchItem?.batch_name}</td>
              <td>{batchItem?.add_package?.package_name}</td>
              <td>
                <div className="dashboard__table__star">
                  {batchItem?.batch_startdate}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {batchItem?.batch_enddate}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {batchItem?.batch_start_timing}
                </div>
              </td>
              <td>
                <div className="dashboard__table__star">
                  {batchItem?.batch_end_timing}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBatches;
