import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 92,
    cellRenderer: (params) => params.rowIndex + 1,
  },
  { headerName: "Title", field: "title", filter: true },
  { headerName: "Description", field: "description", filter: true },
  {
    headerName: "Host",
    field: "host",
    filter: true,
  },
  { headerName: "Duration", field: "duration", filter: true },
  {
    headerName: "Listens",
    field: "listened_count",
    filter: true,
  },
];

const ViewPodcast = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [podcastList, setPodcastList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    const fetchPodcast = async () => {
      if (activeTab !== "View Podcast") return;
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/podcast/",
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
          setPodcastList(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPodcast();
  }, [activeTab, authData?.accessToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (podcastList.length === 0) {
    return (
      <h5 className="text-center text-danger">No Podcasts Available !!</h5>
    );
  }

  return <Table rowData={podcastList} columnDefs={columns} />;
};

export default ViewPodcast;
