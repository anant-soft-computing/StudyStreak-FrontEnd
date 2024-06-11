import React, { useEffect, useState } from "react";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import ajaxCall from "../../../../helpers/ajaxCall";

const RecorededClass = ({ uuid, classes }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recordClass, setRecordClass] = useState([]);

  const recordData = recordClass.filter((item) =>
    classes.some((i) => item.uuid === i.meeting_uuid)
  );

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const handleView = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => {
          joinNow(params.data.play_url);
        }}
      >
        View
      </button>
    );
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = [];
        for (let i = 0; i < uuid.length; i++) {
          const id = uuid[i];
          const response = await ajaxCall(
            `/liveclass/recording/?meeting_uuid=${id}`,
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
          if (
            response?.data &&
            response.data !==
              '{"code":3301,"message":"This recording does not exist."}'
          ) {
            data.push(response.data);
          }
        }
        setRecordClass(data);
      } catch (error) {
        console.error("Error fetching recorded classes:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [uuid]);

  const columns = [
    { headerName: "View", cellRenderer: handleView },
    { headerName: "Name", field: "topic" },
    { headerName: "Password", field: "password" },
  ];
  return (
    <div>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : recordData.length > 0 ? (
        <Table rowData={recordData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          No Recorded Classes Available !!
        </h5>
      )}
    </div>
  );
};

export default RecorededClass;
