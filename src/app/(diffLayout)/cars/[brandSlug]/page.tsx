"use client";
import { FeaturedCars } from "@/components/FeaturedCard/FeaturedCars";
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

const Page = ({ params }: { params: { brandSlug: string } }) => {
  const title = `${params.brandSlug} For Sale`;
  const [data, setData] = useState<Array<dataType>>([]);
  const listings = `${data?.length} listings`;
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://localhost:4000/api/findBrand?slug=${params.brandSlug}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const car = await res.json();
      setData(car.result);
    }

    getData();
  }, [params.brandSlug]);

  return (
    <Stack width={"1720px"}>
      <Stack mt={15} mb={15}>
        <FeaturedCars data={data} title={title} listings={listings} />
      </Stack>
    </Stack>
  );
};

export default Page;
