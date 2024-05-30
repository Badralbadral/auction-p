"use client";

import { Divider, Popover, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

type dataType = {
  bidPrice: string;
  userEmail: string;
  bidCreatedAt: string;
};

export const Bids = ({ id }: { id: string | undefined }) => {
  const [data, setData] = useState<Array<dataType>>();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const open = Boolean(anchorEl);
  const openId = open ? "simple-popover" : undefined;

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://localhost:4000/api/findthiscar?slug=${id}`
      );
      const cars = await res.json();
      setData(cars?.result?.bidContestants);
    }
    getData();
  }, [id]);
  return (
    <Stack color={`#4183c4`} overflow={`hidden`}>
      <Stack onClick={(e) => setAnchorEl(e.currentTarget)}>
        {data?.length} Bids
      </Stack>
      <Popover
        id={openId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Stack
          p={1.5}
          direction={`row`}
          gap={1.5}
          maxHeight={325}
          sx={{ overflowY: `scroll` }}
        >
          <Stack>
            <Typography fontSize={14} mb={1.2}>
              Amount
            </Typography>
            {data?.map((val, index) => {
              return (
                <Stack key={index}>
                  <Divider
                    style={{ width: "360%" }}
                    sx={{
                      bgcolor: `rgba(255, 255, 255, .2)`,
                      height: 1.5,
                    }}
                  ></Divider>
                  <Stack py={1} direction={`row`}>
                    <NumericFormat
                      value={val.bidPrice}
                      thousandSeparator=","
                      disabled
                      style={{
                        border: "none",
                        fontSize: "14px",
                        color: "black",
                        width: 75,
                      }}
                    />
                    <Stack fontSize={14}>USD</Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack>
            <Typography fontSize={14} mb={1.2}>
              Email
            </Typography>
            {data?.map((val, index) => {
              return (
                <Stack key={index}>
                  <Divider sx={{ opacity: 0, height: 1.5 }}></Divider>
                  <Stack fontSize={14} py={1}>
                    {val.userEmail}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack>
            <Typography fontSize={14} mb={1.2}>
              Time
            </Typography>
            {data?.map((val, index) => {
              return (
                <Stack key={index}>
                  <Divider sx={{ opacity: 0, height: 1.5 }}></Divider>
                  <Stack fontSize={14} key={index} py={1}>
                    {val.bidCreatedAt}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};
