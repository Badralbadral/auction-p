"use client";

import { Telephone } from "@/svgs";
import {
  ButtonBase,
  Stack,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";

const customStyle = {
  fontSize: "26px",
  color: "#151515",
  fontWeight: 400,
  lineHeight: "44px",
};
const custStySec = {
  fontSize: "16px",
  color: "#151515",
  fontWeight: 400,
  lineHeight: "24px",
};

export const Contact = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack p={isMobile ? "24px" : "0px"} mt={isMobile ? "15px" : "25px"}>
      <Typography sx={{ ...customStyle, fontSize: isMobile ? "22px" : "26px" }}>
        Ask a Question
      </Typography>
      <Stack mt={isMobile ? "20px" : "30px"}>
        <Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "10px" : "20px"}
          >
            <Stack
              width={"64px"}
              height={"64px"}
              borderRadius={"100%"}
              bgcolor={"black"}
              sx={{ marginBottom: isMobile ? "15px" : "0" }}
            ></Stack>
            <Stack>
              <Typography sx={custStySec}>Exotic Cars</Typography>
              <Typography style={{ color: "#717171" }} sx={custStySec}>
                7 months with JamesEdition
              </Typography>
              <Stack
                mt={"10px"}
                alignItems={"center"}
                gap={"5px"}
                direction={"row"}
              >
                <Telephone />
                <Typography style={{ color: "#717171" }} sx={custStySec}>
                  Show phone number
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack mt={isMobile ? "30px" : "48px"}>
            <Stack mb={isMobile ? "20px" : "30px"}>
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                fontWeight={"500"}
                lineHeight={isMobile ? "20px" : "24px"}
                mb={"10px"}
              >
                Contact Agent
              </Typography>
              <TextareaAutosize
                color="neutral"
                minRows={isMobile ? 4.5 : 6.5}
              />
            </Stack>
            <ButtonBase
              sx={{
                width: "210px",
                height: "48px",
                color: "white",
                bgcolor: "#006C75",
                fontSize: isMobile ? "14px" : "16px",
                lineHeight: "15px",
              }}
            >
              <Typography
                fontSize={isMobile ? "14px" : "16px"}
                fontWeight={"500"}
                lineHeight={"15px"}
              >
                Ask a question
              </Typography>
            </ButtonBase>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
