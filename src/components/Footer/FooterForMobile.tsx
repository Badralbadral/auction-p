import { Stack, Typography } from "@mui/material";
import { FooterSelect } from "./FooterSelect";
import { currency, language } from "@/utils/dumData";

export const FooterForMobile = () => {
  return (
    <Stack
      p={"30px"}
      bgcolor={"black"}
      color={"white"}
      pt={"48px"}
      alignItems={`center`}
    >
      <Stack
        width={"100%"}
        gap={"16px"}
        alignItems={"center"}
        padding={"0 16px"}
      >
        <Typography
          fontSize={"12px"}
          fontWeight={600}
          textTransform={"uppercase"}
          color={"#ADADAD"}
          textAlign={"center"}
        >
          Settings
        </Typography>
        <Stack width={"100%"}>
          <FooterSelect data={language} />
          <FooterSelect data={currency} />
        </Stack>
      </Stack>
    </Stack>
  );
};
