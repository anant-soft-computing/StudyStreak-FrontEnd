import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import ajaxCall from "../../../../../helpers/ajaxCall";
import { Box, List, ListItem, Typography } from "@mui/material";

const NoticeBoard = () => {
  const currentDate = moment().startOf("day");
  const [noticeData, setNoticeData] = useState([]);

  const category = localStorage.getItem("category");
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));
  const studentId = JSON?.parse(localStorage.getItem("StudentID"));

  const activeNotice = noticeData?.filter((item) =>
    moment(item.expiry_date, "YYYY-MM-DD").isSameOrAfter(currentDate)
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/noticeboard-list/",
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
        if (response.status === 200) {
          const filterNotice = response?.data?.filter((item) => {
            const student = item?.student?.some((s) => s?.id === studentId);
            const batch = item?.batch?.some((b) => batchIds?.includes(b?.id));
            const course = item?.course?.some(
              (c) => courseIds?.includes(c?.id) && c?.category === category
            );
            return student || batch || course;
          });

          const responseNotice = filterNotice?.map((item) => {
            return {
              notice: item?.notice,
              expiry_date: item?.expiry_date,
            };
          });
          setNoticeData(responseNotice);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [category]);

  const checkLink = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.split(urlPattern).map((item, index) =>
      urlPattern.test(item) ? (
        <a
          href={item}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          style={{ textDecoration: "none", color: "red" }}
        >
          [Click here]
        </a>
      ) : (
        item
      )
    );
  };

  return (
    activeNotice?.length > 0 && (
      <Box overflow="auto" p={1}>
        <Box
          sx={{
            p: 2,
            border: "1px solid #01579b",
            backgroundColor: "white",
          }}
        >
          <Typography sx={{ color: "#01579b", fontWeight: 700 }} variant="h6">
            Notice board
          </Typography>
          <List>
            {activeNotice?.map((notice, index) => (
              <ListItem
                key={index}
                sx={{
                  ml: 2,
                  display: "list-item",
                  listStyleType: "disc",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                <Typography fontSize={12}>
                  {checkLink(notice?.notice)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    )
  );
};

export default NoticeBoard;
