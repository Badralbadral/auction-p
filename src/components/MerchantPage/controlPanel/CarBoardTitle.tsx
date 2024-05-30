"use client";
import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { CarAddModal } from "@/components/CarAddModal/CarAddModal";
import { CarBoardInfo } from "./CarBoardInfo";

const Style = {
  padding: "15px",
  fontsize: "12px",
  fontweight: "600",
  lineheight: "16px",
};

export const CarBoardTitle = () => {
  return (
    <Stack mt={"50px"}>
      <CarAddModal />
      <Stack
        borderRadius={"12px"}
        bgcolor={"white"}
        direction={"row"}
        width={"1300px"}
      >
        <Stack>
          <Stack width={"1300px"}>
            <Stack borderBottom={"1px solid #ECEDF0"} direction={"row"}>
              <Stack width={"100px"} alignItems={"center"}>
                <Typography sx={Style}>№</Typography>
              </Stack>
              <Typography style={{ width: "200px" }} sx={Style}>
                Brand
              </Typography>
              <Typography style={{ width: "250px" }} sx={Style}>
                Model
              </Typography>
              <Typography style={{ width: "200px" }} sx={Style}>
                Price
              </Typography>
              <Typography style={{ width: "200px" }} sx={Style}>
                Date added
              </Typography>
              <Typography style={{ width: "150px" }} sx={Style}>
                Status
              </Typography>
              <Stack width={"200px"} alignItems={"end"}>
                <Typography style={{ marginRight: "30px" }} sx={Style}>
                  More
                </Typography>
              </Stack>
            </Stack>
            <CarBoardInfo />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
