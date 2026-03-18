import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import SmallModal from "../../../UI/Modal";
import ajaxCall from "../../../../helpers/ajaxCall";

const documentsColumns = [
  {
    headerName: "No.",
    field: "no",
    filter: true,
    cellRenderer: (params) => params.rowIndex + 1,
    width: 110,
  },
  {
    headerName: "Description",
    field: "description",
    filter: true,
    width: 450,
  },
  {
    headerName: "Download",
    field: "document",
    filter: true,
    width: 200,
    cellRenderer: (params) => {
      return params.value !== null ? (
        <button className="take-test" onClick={() => window.open(params.value)}>
          <i className="icofont-download" /> Download
        </button>
      ) : (
        "-"
      );
    },
  },
];

const ViewResources = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const [documents, setDocuments] = useState([]);
  const [openDocuments, setOpenDocuments] = useState(false);

  const handleDocuments = (document) => {
    setOpenDocuments(true);
    setDocuments(document);
  };

  useEffect(() => {
    if (activeTab === "View Resources") {
      setIsLoading(true);
      const fetchResources = async () => {
        try {
          const response = await ajaxCall(
            "/resources/?is_paper=false",
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
            setResourceList(response?.data);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResources();
    }
  }, [activeTab, authData?.accessToken]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      cellRenderer: (params) => params.rowIndex + 1,
      width: 85,
    },
    {
      headerName: "Student",
      field: "student",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params.value.length > 0
          ? params.value
              .map(({ user }) => `${user.first_name} ${user.last_name}`)
              .join(", ")
          : "-",
    },
    {
      headerName: "Course",
      field: "course",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params?.value?.length > 0
          ? params?.value?.map(({ Course_Title }) => Course_Title).join(", ")
          : "-",
    },
    {
      headerName: "Batch",
      field: "batch",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params.value.length > 0
          ? params.value.map(({ batch_name }) => batch_name).join(", ")
          : "-",
    },
    {
      headerName: "Video / Link",
      field: "link",
      filter: true,
      cellRenderer: (params) =>
        params.value ? (
          <button
            className="take-test"
            onClick={() => window.open(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Documents",
      field: "documents",
      width: 300,
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleDocuments(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : resourcesList.length > 0 ? (
        <Table rowData={resourcesList} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">No Resources Available !!</h5>
      )}
      <SmallModal
        size="lg"
        centered
        isOpen={openDocuments}
        onClose={() => setOpenDocuments(false)}
        title="Documents"
      >
        <Table columnDefs={documentsColumns} rowData={documents} />
      </SmallModal>
    </div>
  );
};

export default ViewResources;
