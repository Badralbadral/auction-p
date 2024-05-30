"use client";

import { Box, Stack } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Link from "next/link";

export const CarouselSlider = ({
  img,
  _id,
  brand,
}: {
  img: string[];
  _id: string;
  brand: string;
}) => {
  return (
    <Box>
      <Carousel
        NextIcon={<NavigateNextIcon />}
        PrevIcon={<NavigateBeforeIcon />}
        autoPlay={false}
        indicatorContainerProps={{
          style: {
            position: "absolute",
            bottom: 10,
            zIndex: 10,
          },
        }}
      >
        {img.map((a, index) => (
          <Link key={index} href={{ pathname: `/cars/${brand}/${_id}` }}>
            <Stack
              width={"560px"}
              height={"344px"}
              sx={{
                backgroundImage: `url(${a})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Stack>
          </Link>
        ))}
      </Carousel>
    </Box>
  );
};
