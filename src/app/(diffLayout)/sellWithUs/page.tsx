"use client";

import PublicIcon from "@mui/icons-material/Public";
import { SellWithUsCarousel } from "@/components/SellWithUsCarousel";
import { sellwithUsImg } from "@/utils/dumData";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type dataType = { brandTitle: string; img: string };

const Page = () => {
  const [data, setData] = useState<Array<dataType>>();

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:4000/api/brand");
      const brands = await res.json();
      setData(brands);
    }
    getData();
  }, []);
  const img = sellwithUsImg;
  return (
    <Stack>
      <Stack padding={"0 5vw"} maxWidth={"1920px"} margin={"0 auto"} mt={30}>
        <Stack
          mb={"84px"}
          direction={"row"}
          gap={"125px"}
          padding={"32px 0"}
          justifyContent={"space-between"}
        >
          <Stack width={500} gap={3}>
            <Typography variant="h2">
              Thank you, please share your email address
            </Typography>
            <Stack>
              <FormControl>
                <TextField placeholder="Business email"></TextField>
                <Button size="large">Get Started</Button>
              </FormControl>
            </Stack>
          </Stack>

          <Stack width={600}>
            <SellWithUsCarousel img={img} />
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={"0 5vw"} maxWidth={"1920px"} margin={"0 auto"} mt={10}>
        <Stack
          padding={"77px 0 100px"}
          bgcolor={"#f5f5f5"}
          borderRadius={"24px"}
          border={"1px solid #e0e0e0"}
          alignItems={"center"}
          gap={3}
          maxWidth={"1920px"}
          minWidth={1720}
        >
          <Typography variant="h2">Accelrate your revenue</Typography>
          <Stack
            maxWidth={1000}
            margin={"20px auto 0"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            direction={"row"}
          >
            {data?.map((a, index) => {
              return (
                <Stack
                  key={index}
                  component={"img"}
                  width={120}
                  height={90}
                  src={a.img}
                ></Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <Stack padding={"0 5vw"} maxWidth={"1920px"} margin={"0 auto"} mt={10}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          pt={"80px"}
          pb={"117px"}
          direction={"row"}
        >
          <Stack width={"30%"} gap={1}>
            <PublicIcon />
            <Typography fontSize={"26px"}>Present your car</Typography>
            <Typography fontSize={"20px"}>
              Expose your brand in a trusted luxury environment tailored to
              create a unique perception.
            </Typography>
            <Typography>
              Impeccable listing presentation <br />
              Unlimited HD images and videos
              <br /> Logo on search, listing and business pages
            </Typography>
          </Stack>
          <Stack width={"30%"} gap={1}>
            <PublicIcon />
            <Typography fontSize={"26px"}>Promote Your Listings</Typography>
            <Typography fontSize={"20px"}>
              Reach consumers around the globe across multiple touchpoints via a
              built-in suite of online marketing tools.
            </Typography>
            <Typography>
              SEO optimization in 5 languages <br />
              Paid and organic remarketing
              <br /> Top positions in search results on JE
            </Typography>
          </Stack>
          <Stack width={"30%"} gap={1}>
            <PublicIcon />
            <Typography fontSize={"26px"}>Measure Results</Typography>
            <Typography fontSize={"20px"}>
              Fill your pipeline with high quality leads, track performance,
              measure ROI and make decisions based on data.
            </Typography>
            <Typography>
              Reporting on listings and leads <br />
              Raw data in CSV
              <br /> Top performing listings
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Page;
