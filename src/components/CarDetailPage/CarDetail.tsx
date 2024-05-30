"use client";
import { BreadCrumbArrow, Camera } from "@/svgs";
import { Box, ButtonBase, CardMedia, Stack, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

type dataType = {
  brand: string;
  carModel: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  endTime: string;
  _id: string;
};

export const CarDetail = ({ data }: { data: dataType | undefined }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mainImageHovered, setMainImageHovered] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack
      mt={isMobile ? 10 : 15}
      width={"100%"}
      maxWidth={"1720px"}
      p={isMobile ? 2 : 4}
    >
      <Stack
        pl={isMobile ? "16px" : ""}
        justifyContent={"flex-start"}
        direction={"row"}
        alignItems={"center"}
        gap={"10px"}
        mb={"15px"}
      >
        <Link href={`/cars/${data?.brand}`} style={{ textDecoration: "none" }}>
          <Box fontSize={"14px"} fontWeight={"400"} color={"#717171"}>
            {data?.brand}
          </Box>
        </Link>
        <BreadCrumbArrow />
        <Typography fontSize={"14px"} fontWeight={"400"} color={"#717171"}>
          {data?.carModel}
        </Typography>
      </Stack>
      <Stack
        position="relative"
        gap={"4px"}
        direction={isMobile ? "column" : "row"}
        width={"100%"}
        height={isMobile ? "auto" : "500px"}
      >
        <Stack
          overflow="hidden"
          width={isMobile ? "100%" : "865px"}
          height={isMobile ? "auto" : "100%"}
          borderRadius={"8px"}
        >
          <Stack
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transform: mainImageHovered ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.5s",
            }}
            onMouseEnter={() => setMainImageHovered(true)}
            onMouseLeave={() => setMainImageHovered(false)}
          >
            {isMobile && (
              <Stack position={"absolute"} bottom={"30px"} right={"10px"}>
                <ButtonBase
                  sx={{
                    overflow: "hidden",
                    borderRadius: "100px",
                    p: "6px 18px",
                    gap: "6px",
                    bgcolor: "rgba(21, 21, 21, 0.5)",
                  }}
                >
                  <Camera />
                  <Typography sx={{ color: "white" }}>
                    {data?.img.length} Photos
                  </Typography>
                </ButtonBase>
              </Stack>
            )}
            <CardMedia
              component={"img"}
              src={data?.img[0]}
              style={{
                width: "100%",
                height: isMobile ? "auto" : "100%",
                objectFit: "cover",
              }}
            />
          </Stack>
        </Stack>
        {!isMobile && (
          <Stack width={"870px"} height={"500px"} flexWrap={"wrap"} gap={"4px"}>
            {data?.img.map((e: string, index: number) => (
              <Stack
                key={index}
                sx={{ overflow: "hidden", borderRadius: "5px" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  style={{
                    width: "428px",
                    height: "248px",
                    position: "relative",
                    transform:
                      hoveredIndex === index ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.5s",
                  }}
                >
                  <CardMedia
                    component={"img"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={e}
                  />
                </Box>
              </Stack>
            ))}
            <Stack position={"absolute"} bottom={"20px"} right={"20px"}>
              <ButtonBase
                sx={{
                  borderRadius: "100px",
                  p: "9px 24px",
                  gap: "8px",
                  bgcolor: "rgba(21, 21, 21, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(21, 21, 21, 0.8)",
                  },
                }}
              >
                <Camera />
                <Typography sx={{ color: "white" }}>
                  {data?.img.length} Photos
                </Typography>
              </ButtonBase>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
