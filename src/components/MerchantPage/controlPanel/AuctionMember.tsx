"use client";
import { Stack, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

// interface Info {
//   bidContestants: string;
//   userEmail: string;
//   bidPrice: string[];
//   bidCreatedAt: string;
// }

const textSecStyle = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
};
const textThirStyle = {
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
};

export const AuctionMember = () => {
  //   const [infos, setInfos] = useState<Info[]>();

  //   useEffect(() => {
  //     async function fetchData() {
  //       const res = await fetch(`http://localhost:4000/api/car`);
  //       const data = await res.json();
  //       setInfos(data);
  //     }
  //     fetchData();
  //   }, []);
  //   console.log(infos);
  return (
    <Stack
      borderRadius={"12px"}
      border={"1px solid #ECEDF0"}
      bgcolor={"white"}
      width={"470px"}
      height={"100%"}
      p={"25px"}
    >
      <Stack pb={"20px"} borderBottom={"1px solid #ECEDF0"}>
        <Typography color={"#121316"} sx={textThirStyle}>
          Bid contestants
        </Typography>
      </Stack>
      <Stack maxHeight={"800px"} sx={{ overflowY: "scroll" }}>
        <Stack p={"10px "} borderBottom={"1px solid #ECEDF0"}>
          <Typography color={"#3F4145"} sx={textSecStyle}>
            Name:
            <br /> Email:
            <br />
            Bid price:
            <br />
            Bid created at:
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
