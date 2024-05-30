"use client";
import { useRef, useEffect, useState } from "react";
import { Stack, Typography, ButtonBase, useMediaQuery } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { DetailPageBidBox } from "./DetailPageBidBox";
const customStyle = {
  fontSize: { xs: "18px", sm: "26px" },
  color: "#151515",
  fontWeight: 400,
  lineHeight: { xs: "28px", sm: "44px" },
};
const custStySec = {
  fontSize: { xs: "14px", sm: "16px" },
  color: "#151515",
  fontWeight: 400,
  lineHeight: { xs: "22px", sm: "24px" },
};
const moreOrLess = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
type dataType = {
  _id: string;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  endTime: string;
};
export const CarInfo = ({ data }: { data: dataType | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      setShowReadMore(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [data]);

  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Stack
      width={"100%"}
      maxWidth={"1720px"}
      padding={isMobile ? "16px" : "32px"}
    >
      <Stack
        padding={isMobile ? "16px" : "0px"}
        borderBottom={"1px solid #E0E0E0"}
        gap={"8px"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={customStyle}>{data?.brand}</Typography>
          <Typography sx={customStyle}>
            <NumericFormat
              value={data?.startPrice}
              thousandSeparator=","
              suffix="$"
              displayType="text"
              style={{
                border: "none",
                fontWeight: "400",
                fontSize: "inherit",
                color: "inherit",
                width: "auto",
                backgroundColor: "white",
                textAlign: "end",
              }}
            />
          </Typography>
        </Stack>
        <Stack mb={isMobile ? "12px" : "24px"}>
          <Typography fontSize={"14px"} fontWeight={"400"} lineHeight={"22px"}>
            {data?.carDetails[1]}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        padding={isMobile ? "16px" : "0px"}
        mt={isMobile ? "12px" : "25px"}
        gap={2}
      >
        <Typography
          fontSize={isMobile ? "16px" : "20px"}
          fontWeight={"400"}
          lineHeight={isMobile ? "24px" : "32px"}
        >
          About This Car
        </Typography>
        <Stack borderBottom={"1px solid #E0E0E0"}>
          <Stack
            sx={{ ...custStySec, ...(isOpen ? null : moreOrLess) }}
            ref={ref}
            width={"full"}
          >
            {data?.description}
          </Stack>
          <Stack width={"100px"} mb={"25px"}>
            {showReadMore && (
              <ButtonBase
                sx={{ height: "30px", borderRadius: "50px" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "Read Less" : "Read More ..."}
              </ButtonBase>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        mt={isMobile ? "10px" : "25px"}
        direction={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
      >
        <Stack
          padding={isMobile ? "16px" : ""}
          pb={"40px"}
          borderBottom={"1px solid #E0E0E0"}
          gap={"16px"}
        >
          <Typography sx={customStyle}>Car Details</Typography>
          {data?.carDetails.slice(0, 15).map((a, index) => {
            const labels = [
              "Year",
              "Location",
              "Address",
              "Mileage",
              "Engine",
              "Gearbox",
              "Car type",
              "Drive",
              "Drive Train",
              "Fuel Type",
              "Power",
              "Condition",
              "Exterior Color",
              "Interior Color",
            ];
            return (
              <Stack
                key={index}
                display={"grid"}
                gridTemplateColumns={"min-content auto"}
                sx={{ gridColumnGap: "16px", gridRowGap: "8px" }}
                alignItems={"center"}
              >
                <Typography component={"span"} width={100} color={"#717171"}>
                  {a && labels[index]}
                </Typography>
                <Typography>{a}</Typography>
              </Stack>
            );
          })}
        </Stack>
        <Stack pt={isMobile ? "30px" : ""}>
          {data?.endTime && (
            <DetailPageBidBox
              _id={data?._id}
              startPrice={data?.startPrice}
              endDate={data?.endTime}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
