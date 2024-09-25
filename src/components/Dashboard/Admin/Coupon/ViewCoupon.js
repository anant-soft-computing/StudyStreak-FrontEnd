import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 92 },
  { headerName: "Name", field: "cupon_name", filter: true, width: 300 },
  {
    headerName: "Campaign Name",
    field: "campaign_name",
    filter: true,
    width: 220,
  },
  {
    headerName: "Code",
    field: "cupon_code",
    filter: true,
    width: 210,
  },
  { headerName: "Discount", field: "discount", filter: true, width: 210 },
  {
    headerName: "Start Date & Time",
    field: "start_date",
    cellRenderer: (params) => moment(params.value).format("lll"),
    filter: true,
    width: 210,
  },
  {
    headerName: "End Date & Time",
    field: "end_date",
    cellRenderer: (params) => moment(params.value).format("lll"),
    filter: true,
    width: 210,
  },
];

const ViewCoupon = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [couponList, setCouponList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    const fetchCoupones = async () => {
      if (activeTab !== "View Coupon") return;
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          `/cuponlistview/`,
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
          const couponsWithNumbers = response.data.map((coupon, index) => ({
            ...coupon,
            no: index + 1,
          }));
          setCouponList(couponsWithNumbers);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoupones();
  }, [activeTab, authData?.accessToken]);

  if (isLoading) {
    return <Loading />;
  }

  if (couponList.length === 0) {
    return <h5 className="text-center text-danger">No Coupons Available !!</h5>;
  }

  return <Table rowData={couponList} columnDefs={columns} />;
};

export default ViewCoupon;
