import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import { Box, List, ListItem, Typography } from "@mui/material";

const NoticeBoard = () => {
  const [notice, setNotice] = useState([]);

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
          const noticeData = response?.data?.map((item) => {
            return {
              notice: item?.notice,
              expiry_date: item?.expiry_date,
            };
          });
          setNotice(noticeData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

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
    notice?.length > 0 && (
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
            {notice?.map((notice, index) => (
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
