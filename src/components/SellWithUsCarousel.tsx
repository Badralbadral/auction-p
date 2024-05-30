"use client";

import { Stack } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export const SellWithUsCarousel = ({ img }: { img: string[] }) => {
  return (
    <Stack width={600}>
      <Carousel
        autoPlay={true}
        interval={4000}
        stopAutoPlayOnHover={true}
        animation="fade"
        navButtonsAlwaysInvisible
        IndicatorIcon
      >
        {img.map((a, index) => (
          <Stack
            width={"600px"}
            height={"384px"}
            sx={{
              backgroundImage: `url(${a})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={index}
            borderRadius={"20px"}
          ></Stack>
        ))}
      </Carousel>
    </Stack>
  );
};
