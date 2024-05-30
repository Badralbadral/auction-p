"use client";
import React, { useState, useEffect } from "react";
import { ArrowSmall, ShortArrow, ShortArrowRight } from "@/svgs";
import { ButtonBase, CardMedia, Stack, Typography } from "@mui/material";

type ObjType = {
  brandTitle: string;
  __v: string;
  img: string;
};

export const PopSearches = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [brand, setBrand] = useState<Array<ObjType>>([]);

  useEffect(() => {
    async function fetchCarData() {
      try {
        const res = await fetch(
          `https://auction-back-end.onrender.com/api/brand`
        );
        const data = await res.json();
        setBrand(data);
      } catch (error) {
        console.error("error fetching car data:", error);
      }
    }
    fetchCarData();
  }, []);

  const prev = () => {
    setStartIdx((prevStartIdx) =>
      prevStartIdx === 0 ? brand.length / 2 - 2 : prevStartIdx - 2
    );
  };

  const next = () => {
    setStartIdx((prevStartIdx) =>
      prevStartIdx == brand.length / 2 ? 0 : prevStartIdx + 2
    );
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"1730px"}>
      <Stack marginBottom={"30px"} gap={"1400px"} direction={"row"}>
        <Typography fontSize={"27px"} fontWeight={400} lineHeight={"38px"}>
          Popular Searches
        </Typography>
        <Stack gap={"20px"} direction={"row"}>
          <ButtonBase
            sx={{
              p: "8px",
              border: "#E0E0E0 1px solid",
              borderRadius: "100%",
            }}
            onClick={prev}
          >
            <ShortArrow />
          </ButtonBase>
          <ButtonBase
            sx={{
              p: "8px",
              border: "#E0E0E0 1px solid",
              borderRadius: "100%",
            }}
            onClick={next}
          >
            <ShortArrowRight />
          </ButtonBase>
        </Stack>
      </Stack>
      <Stack overflow={"hidden"} direction={"row"} width={"100%"}>
        <Stack
          gap={"20px"}
          direction={"column"}
          flexWrap={"wrap"}
          height={"280px"}
          style={{
            transition: "transform 1s ease",
            transform: `translateX(-${startIdx * 580}px)`,
          }}
        >
          {brand.map((car, index) => (
            <Stack
              direction={"row"}
              key={index}
              border={"#E0E0E0 solid 1px"}
              width={"560px"}
              height={"128px"}
              sx={{
                transition: "border-color 0.3s linear",
                "&:hover": {
                  border: "black 1px solid",
                },
              }}
            >
              <Stack
                sx={{
                  "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                }}
                width={"128px"}
                height={"126px"}
              >
                <CardMedia
                  image={car.img}
                  alt={`Car ${index}`}
                  component={"img"}
                />
              </Stack>
              <Stack direction={"column"} gap={"50px"} p={"15px"}>
                <Typography>{car.brandTitle}</Typography>
                <Stack gap={"305px"} direction={"row"} alignItems={"center"}>
                  <Typography>{car.__v}</Typography>
                  <ButtonBase>
                    <ArrowSmall />
                  </ButtonBase>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
