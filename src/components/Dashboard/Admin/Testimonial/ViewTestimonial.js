import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewTestimonial = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonialList, setTestimonialList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const viewImage = (params) => {
    return (
      <button className="take-test" onClick={() => window.open(params.value)}>
        View
      </button>
    );
  };

  const columns = [
    {
      headerName: "No.",
      field: "no",
      width: 76,
    },
    { headerName: "Name", field: "name", filter: true, width: 280 },
    {
      headerName: "Description",
      field: "description",
      filter: true,
      width: 700,
    },
    {
      headerName: "Position",
      field: "position",
      filter: true,
    },
    {
      headerName: "Image",
      field: "image",
      filter: true,
      cellRenderer: viewImage,
    },
  ];

  useEffect(() => {
    if (activeTab === "View Testimonial") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/testimonial/`,
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
            const testimonialWithNumbers = response?.data?.map(
              (item, index) => ({
                ...item,
                no: index + 1,
              })
            );
            setTestimonialList(testimonialWithNumbers);
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
  ) : testimonialList.length > 0 ? (
    <Table rowData={testimonialList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Testimonials Available !!</h5>
  );
};

export default ViewTestimonial;
