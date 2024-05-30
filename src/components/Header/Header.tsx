"use client";
import { Divider, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { SearchModal } from "./SearchModal";
import { useEffect, useState } from "react";
import { useCarData, ContextType } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { LoginModal } from "./LoginModal";
import { MenuDrawer } from "./MenuDrawer";

type dataType = { brandTitle: string; img: string };

export const Header = () => {
  const [data, setData] = useState<Array<dataType>>();
  const { scrolling, setScrolling } = useCarData() as ContextType;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://auction-back-end.onrender.com/api/brand"
      );
      const brands = await res.json();
      setData(brands);
    }
    getData();
  }, []);

  return (
    <Stack
      className={scrolling ? "navbar-scroll" : ""}
      sx={{ transition: `all 0.3s ease` }}
      width={1}
      position={`fixed`}
      zIndex={100}
      alignItems={`center`}
    >
      <Stack
        height={66}
        width={1}
        direction={`row`}
        alignItems={`center`}
        px={7}
        justifyContent={`space-between`}
        bgcolor={`transparent`}
      >
        <Stack
          gap={isMobile ? "315px" : ""}
          direction={`row`}
          alignItems={`center`}
        >
          <MenuDrawer />
          <ToastContainer containerId="containerB" />
          <Stack
            color={scrolling ? "black" : `white`}
            fontSize={24}
            width={`fit-content`}
            sx={{ cursor: `pointer` }}
            onClick={() => router.push("/")}
          >
            Prestige
          </Stack>
        </Stack>
        <SearchModal />
        <Stack height={`100%`} direction={`row`} alignItems={`center`} gap={3}>
          <Stack
            height={`100%`}
            color={scrolling ? "black" : `white`}
            sx={
              scrolling
                ? {
                    cursor: `pointer`,
                    ":hover": {
                      borderBottom: `1px solid black`,
                    },
                  }
                : {
                    cursor: `pointer`,
                    ":hover": {
                      borderBottom: `1px solid white`,
                    },
                  }
            }
            justifyContent={`center`}
            fontSize={14}
          >
            Sell With Us
          </Stack>
          <LoginModal />
        </Stack>
      </Stack>
      <Divider
        style={{ width: "100%" }}
        sx={{ bgcolor: `rgba(255, 255, 255, .2)`, height: 1.5 }}
      ></Divider>

      <Stack
        direction={`row`}
        alignItems={`center`}
        width={1}
        height={46}
        gap={2.7}
        px={7}
      >
        {data?.map((val) => {
          return (
            <Link
              key={val.brandTitle}
              href={`/cars/${val.brandTitle}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                color={scrolling ? "black" : `white`}
                fontSize={14}
                fontWeight={100}
                sx={{ cursor: `pointer` }}
              >
                {val.brandTitle}
              </Typography>
            </Link>
          );
        })}
      </Stack>

      <Divider
        style={{ width: "100%" }}
        sx={{ bgcolor: `rgba(255, 255, 255, .2)`, height: 1.5 }}
      ></Divider>
    </Stack>
  );
};
