"use client";

import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

type dataType = {
  bidPrice: string;
  userEmail: string;
  bidCreatedAt: string;
};

export const BidsForDetail = ({ id }: { id: string | undefined }) => {
  const [data, setData] = useState<Array<dataType>>();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    async function getData() {
      if (id) {
        const res = await fetch(
          `http://localhost:4000/api/findthiscar?slug=${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const cars = await res.json();
        setData(cars?.result?.bidContestants?.reverse());
      }
    }
    getData();
  }, [id]);

  return (
    <Stack color={`#4183c4`} overflow={`hidden`}>
      <Stack
        direction={`row`}
        justifyContent={`space-between`}
        maxHeight={325}
        sx={{ overflowY: "scroll" }}
      >
        <Stack>
          <Typography fontSize={isMobile ? 13 : 16} mb={1.2} color={`black`}>
            Amount
          </Typography>
          {data?.map((val, index) => (
            <Stack key={index}>
              <Divider
                style={{ width: "560%" }}
                sx={{
                  bgcolor: `rgba(255, 255, 255, .2)`,
                  height: 1.5,
                }}
              ></Divider>
              <Stack py={1} direction={`row`} color={`black`}>
                <Stack fontSize={16} mr={1}>
                  {index + 1}.
                </Stack>
                <NumericFormat
                  value={val.bidPrice}
                  thousandSeparator=","
                  disabled
                  style={
                    isMobile
                      ? { border: "none", fontSize: "12px", width: 70 }
                      : {
                          border: "none",
                          fontSize: "16px",
                          width: 95,
                          backgroundColor: `white`,
                        }
                  }
                />
                <Stack alignSelf={"center"} fontSize={isMobile ? 12 : 14}>
                  USD
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack>
          <Typography fontSize={isMobile ? 13 : 16} mb={1.2} color={`black`}>
            Email
          </Typography>
          {data?.map((val, index) => (
            <Stack key={index} pt={0.1}>
              <Stack fontSize={isMobile ? 12 : 15} py={1} color={`black`}>
                {val.userEmail}
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack>
          <Typography
            fontSize={isMobile ? 13 : 16}
            mb={isMobile ? 1 : 1.2}
            color={`black`}
          >
            Time
          </Typography>
          {data?.map((val, index) => (
            <Stack key={index} pt={0.1}>
              <Stack
                fontSize={isMobile ? 10 : 15}
                key={index}
                py={isMobile ? 1.486 : 1.09}
                color={`black`}
              >
                {val.bidCreatedAt}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
