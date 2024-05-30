"use client";

import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FooterSelect } from "./FooterSelect";
import {
  currency,
  footerSubtitles,
  footerTitles,
  language,
} from "@/utils/dumData";
import { useEffect, useState } from "react";
import { FooterForMobile } from "./FooterForMobile";
import Link from "next/link";

type dataType = { brandTitle: string; img: string };

export const Footer = () => {
  const [data, setData] = useState<Array<dataType>>();
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  if (isMobile) {
    return <FooterForMobile />;
  }

  return (
    <Stack bgcolor={"black"} color={"white"} pt={"48px"} alignItems={`center`}>
      <Stack direction={"row"} width={1673} justifyContent={`space-between`}>
        <Stack direction={"row"}>
          <Stack width={"200px"} height={"700px"} gap={"16px"}>
            <Typography
              fontSize={"12px"}
              fontWeight={600}
              textTransform={"uppercase"}
              color={"#ADADAD"}
            >
              JAMESEDITION
            </Typography>
            {footerTitles.map((a, index) => (
              <Stack gap={"20px"} key={index}>
                {a}
              </Stack>
            ))}
          </Stack>
          <Stack width={"200px"} height={"700px"} gap={"16px"}>
            <Typography
              fontSize={"12px"}
              fontWeight={600}
              textTransform={"uppercase"}
              color={"#ADADAD"}
            >
              BRANDS
            </Typography>
            {data?.map((b, index) => {
              return (
                <Link
                  href={`/cars/${b.brandTitle}`}
                  key={index}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Stack gap={"20px"}>{b.brandTitle}</Stack>
                </Link>
              );
            })}
          </Stack>
          <Stack width={"200px"} height={"700px"} gap={"16px"}>
            <Typography
              fontSize={"12px"}
              fontWeight={600}
              textTransform={"uppercase"}
              color={"#ADADAD"}
            >
              FOR BUSINESS
            </Typography>
            {footerSubtitles.map((a, index) => {
              return (
                <Link
                  key={index}
                  href={`/${a}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Stack gap={"20px"}>{a}</Stack>
                </Link>
              );
            })}
          </Stack>
        </Stack>
        <Stack width={"200px"} gap={"16px"}>
          <Typography
            fontSize={"12px"}
            fontWeight={600}
            textTransform={"uppercase"}
            color={"#ADADAD"}
          >
            Settings
          </Typography>
          <Stack>
            <FooterSelect data={language} />
            <FooterSelect data={currency} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
