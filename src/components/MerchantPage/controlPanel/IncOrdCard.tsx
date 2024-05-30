"use client";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  bgcolor: "white",
  width: "620px",
  height: "135px",
  borderRadius: "12px",
  padding: "16px 24px ",
  alignItems: "space-between",
  border: "1px solid #ECEDF0",
  gap: "12px",
};

const textStyle = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "13px",
  letterSpacing: "-0.3px",
};

const textStyleSec = {
  fontSize: "32px",
  fontWeight: "700",
  lineHeight: "40px",
};

export const IncOrdCard = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:4000/api/car`);
        const data = await res.json();
        console.log("Data from API:", data);

        let sumPrice = data.reduce(
          (accumulator: number, car: { startPrice: number }) => {
            return accumulator + car.startPrice;
          },
          0
        );

        setTotalPrice(sumPrice);
        console.log("Total price:", sumPrice);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Stack mt={"40px"} bgcolor={"white"}>
      <Stack bgcolor={"#F7F7F8"}>
        <Typography
          p={"20px"}
          fontSize={"24px "}
          fontWeight={"700"}
          lineHeight={"13px"}
        >
          Overview
        </Typography>
        <Stack gap={"50px"} direction={"row"}>
          <Stack sx={style}>
            <Stack alignItems={"center"} gap={"4px"} direction={"row"}>
              <Typography sx={textStyle}>$ Income</Typography>
            </Stack>
            <Typography sx={textStyleSec}>{totalPrice}₮</Typography>
            <Typography color={"#5E6166"}>Today</Typography>
          </Stack>
          <Stack sx={style}>
            <Stack direction={"row"}>
              <Typography sx={textStyle}>Order</Typography>
            </Stack>
            <Typography sx={textStyleSec}>235,000₮</Typography>
            <Typography color={"#5E6166"}>Today</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
