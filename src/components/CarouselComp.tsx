"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@/svgs/index";
import { Button, Stack, Typography } from "@mui/material";

interface Car {
  carModel: string;
  img: string[];
}
export const Carousel = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [curr, setCurr] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");

  const prev = () => {
    setCurr(curr === 0 ? cars.length - 1 : curr - 1);
    setCurrentTitle(
      cars[curr === 0 ? cars.length - 1 : curr - 1]?.carModel || ""
    );
  };
  const next = () => {
    setCurr(curr === cars.length - 1 ? 0 : curr + 1);
    setCurrentTitle(
      cars[curr === cars.length - 1 ? 0 : curr + 1]?.carModel || ""
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://auction-back-end.onrender.com/api/car`
        );
        const data = await res.json();
        setCars(data.slice(0, 4));
        setCurrentTitle(data[0]?.carModel || "");
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurr((curr) => (curr === cars.length - 1 ? 0 : curr + 1));
      setCurrentTitle(
        cars[curr === cars.length - 1 ? 0 : curr + 1]?.carModel || ""
      );
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Stack width={"full"} overflow={"hidden"} position={"relative"}>
      <Stack direction={"row"}>
        {cars.map((car, index) => (
          <Stack key={index} position={`relative`}>
            <Stack
              sx={{
                display: "flex",
                transition: "transform 1s ease",
                transform: `translateX(-${curr * 100}%)`,
              }}
              width={`100vw`}
            >
              <Stack
                sx={{
                  backgroundImage: `url('${car.img[0]}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `center`,
                  backgroundSize: "cover",
                  width: "100vw",
                  height: "920px",
                }}
              ></Stack>
            </Stack>
            <Stack
              bgcolor={`black`}
              sx={{ opacity: `30%` }}
              width={1}
              height={1}
              position={`absolute`}
              zIndex={5}
            ></Stack>
          </Stack>
        ))}
      </Stack>
      <Stack position={"absolute"} width={1} alignItems={`center`}>
        <Stack
          width={1920}
          justifyContent={"space-between"}
          padding={"710px 96px 60px 96px"}
          direction={"row"}
        >
          <Stack zIndex={10}>
            <Typography
              fontSize={"54px"}
              fontWeight={"400"}
              lineHeight={"68px"}
              color={"white"}
            >
              The World&apos;s <br /> Luxury Marketplace
            </Typography>
            <Typography
              marginTop={"20px"}
              color={"white"}
              fontSize={"11px"}
              fontWeight={"500"}
              lineHeight={"15px"}
              letterSpacing={"1px"}
            >
              One search • 400,000+ listings • 18,000+ trusted sellers • 120
              countries
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"flex-end"}>
            <Stack>
              <Stack direction={"row"}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}
                >
                  {cars.map((_, i) => (
                    <Stack
                      zIndex={10}
                      key={i}
                      sx={{
                        transition: "all 0.3s ease stroke-dasharray",
                        width: "15px",
                        height: "1px",
                        bgcolor: "white",
                        ...(curr === i && { bgcolor: "black" }),
                      }}
                    />
                  ))}
                </Stack>
                <Stack alignItems={"flex-end"} direction={"row"} zIndex={10}>
                  <Button onClick={prev}>
                    <ArrowLeft />
                  </Button>
                  <Button onClick={next}>
                    <ArrowRight />
                  </Button>
                </Stack>
              </Stack>
              <Typography
                color={"white"}
                fontSize={"11px"}
                fontWeight={"500"}
                lineHeight={"15px"}
                letterSpacing={"1px"}
              >
                {currentTitle}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
