"use client";
import { CarDetail } from "@/components/CarDetailPage/CarDetail";
import { CarInfo } from "@/components/CarDetailPage/CarInfo";
import { Contact } from "@/components/CarDetailPage/Contact";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

type dataType = {
  _id: string;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  endTime: string;
  bidContestants: Array<{}>;
};

const Page = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<dataType>();
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://localhost:4000/api/findthiscar?slug=${params.slug}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const car = await res.json();
      setData(car.result);
    }
    getData();
  }, [params.slug]);
  return (
    <Stack width={"100%"} alignItems={"center"} pb={10}>
      <Stack>
        <CarDetail data={data} />
        <CarInfo data={data} />
        <Contact />
      </Stack>
    </Stack>
  );
};

export default Page;
