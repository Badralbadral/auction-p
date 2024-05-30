"use client";
import { AuctionInfo } from "@/components/MerchantPage/AuctionInfo";
import { Stack } from "@mui/material";
// import { useEffect, useState } from "react";

// type dataType = {
//   _id: number;
//   carModel: string;
//   brand: string;
//   startPrice: number;
//   img: string[];
//   endTime: string;
// };

const Page = () => {
  //   const [data, setData] = useState<dataType[]>([]);

  //   useEffect(() => {
  //     async function getData() {
  //       const res = await fetch("http://localhost:4000/api/car");
  //       const cars = await res.json();
  //       setData(cars);
  //       console.log("fcwf", cars);
  //     }
  //     getData();
  //   }, []);

  return (
    <Stack bgcolor={"#F7F7F8"} height={"100vh"} alignItems={"center"}>
      <AuctionInfo />
    </Stack>
  );
};
export default Page;
