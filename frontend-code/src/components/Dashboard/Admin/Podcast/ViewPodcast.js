import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import SmallModal from "../../../UI/Modal";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewPodcast = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [podcastList, setPodcastList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const [audio, setAudio] = useState([]);
  const [openAudio, setOpenAudio] = useState(false);

  const handleAudio = (audio) => {
    setOpenAudio(true);
    setAudio(audio);
  };

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
    {
      headerName: "Date",
      field: "created_at",
      filter: true,
      cellRenderer: (params) =>
        moment(params.data.created_at).format("MMM DD, YYYY"),
    },
    { headerName: "Category", field: "category", filter: true },
    {
      headerName: "Listens",
      field: "listened_count",
      filter: true,
      width: 100,
      cellRenderer: (params) => `${params.data.listened_count}k`,
    },
    {
      headerName: "Audio",
      field: "audio",
      filter: true,
      cellRenderer: (params) => {
        return (
          params.value && (
            <button
              className="take-test"
              onClick={() => handleAudio(params.value)}
            >
              Listen
            </button>
          )
        );
      },
    },
  ];

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

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : podcastList.length > 0 ? (
        <Table rowData={podcastList} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">No Podcasts Available !!</h5>
      )}
      <SmallModal
        size="md"
        centered
        isOpen={openAudio}
        onClose={() => setOpenAudio(false)}
        title="Audio"
      >
        <audio className="w-100" controls src={audio}></audio>
      </SmallModal>
    </div>
  );
};

export default ViewPodcast;
