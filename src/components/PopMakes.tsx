"use client";
import { Stack, Typography, ButtonBase, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ObjType = {
  brandTitle: string;
  img: string;
};

export const PopMakes = () => {
  const [brand, setBrand] = useState<Array<ObjType>>();
  const router = useRouter();

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

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"1730px"}>
      <Stack marginBottom={"30px"} gap={"1470px"} direction={"row"}>
        <Typography fontSize={"27px"} fontWeight={400} lineHeight={"38px"}>
          Popular Makes
        </Typography>
        <ButtonBase sx={{ width: "60px", height: "24px", alignSelf: "center" }}>
          <Typography
            sx={{
              cursor: `pointer`,
              textDecoration: "underline",
              textUnderlineOffset: `4.3px`,
              textDecorationColor: "rgba(120, 120, 120, 0.4)",
              transitionDuration: "0.22s",
              ":hover": {
                textDecorationColor: "black",
                transitionDuration: "0.22s",
              },
            }}
            fontSize={"16px"}
            fontWeight={500}
            lineHeight={"24px"}
          >
            View all
          </Typography>
        </ButtonBase>
      </Stack>
      <Stack
        justifyContent={"space-between"}
        gap={"20px"}
        direction="row"
        flexWrap={"wrap"}
      >
        {brand?.map((e: { img: string; brandTitle: string }, index: number) => (
          <Stack
            key={index}
            width={"195px"}
            height={"148px"}
            sx={{
              cursor: `pointer`,
              border: "#E0E0E0 1px solid",
              transition: "border-color 300ms linear",
              "&:hover": {
                border: "black 1px solid",
              },
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            }}
          >
            <Stack onClick={() => router.push(`/cars/${e.brandTitle}`)}>
              <CardMedia image={e.img} alt={`Car ${index}`} component={"img"} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
