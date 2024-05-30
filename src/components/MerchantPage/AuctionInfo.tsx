"use client";
import { ArrowBlackLeft } from "@/svgs";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuctionMember } from "./controlPanel/AuctionMember";

const textStyle = {
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.6px",
  color: "#121316",
};
const textSecStyle = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
};
const textThirStyle = {
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
};

// type dataType = {
//   _id: number;
//   carModel: string;
//   brand: string;
//   startPrice: number;
//   img: string[];
//   endTime: string;
// };

export const AuctionInfo = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack ml={"30px"} alignItems={"start"}>
        <ButtonBase
          onClick={() => router.push("/merchant")}
          sx={{
            gap: "20px",
            borderRadius: "10px",
            height: "50px",
          }}
        >
          <ArrowBlackLeft />
          <Typography sx={textStyle}>Auction details</Typography>
        </ButtonBase>
      </Stack>
      <Stack p={"30px"} gap={"30px"} direction={"row"}>
        <Stack
          borderRadius={"12px"}
          p={"25px"}
          gap={"25px"}
          width={"640px"}
          height={"900px"}
          bgcolor={"white"}
          border={"1px solid #ECEDF0"}
        >
          <Stack justifyContent={"space-between"} direction={"row"}>
            <Stack>
              <Typography style={{ color: "#3F4145" }} sx={textStyle}>
                Brand:
              </Typography>
              <Typography sx={textSecStyle}>Model</Typography>
            </Stack>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={"130px"}
            >
              <Typography
                sx={{
                  padding: "6px 15px",
                  borderRadius: "50px",
                  bgcolor: "#C1E6CF",
                }}
              >
                Sell
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography style={{ color: "#3F4145" }} sx={textStyle}>
              Subscriber:
            </Typography>
            <Stack gap={"10px"} alignItems={"center"} direction={"row"}>
              <Typography sx={textSecStyle}>Name -</Typography>
              <Typography
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"20px"}
              >
                email
              </Typography>
            </Stack>
          </Stack>
          <Stack
            borderRadius={"12px"}
            width={"580px"}
            height={"160px"}
            bgcolor={"#F7F7F8"}
            direction={"row"}
          >
            <Stack
              sx={{
                borderBottomLeftRadius: "12px",
                borderTopLeftRadius: "12px",
              }}
              width={"180px"}
              height={"160px"}
              bgcolor={"grey"}
            ></Stack>
            <Stack p={"0px 15px"} justifyContent={"center"} gap={"20px"}>
              <Stack>
                <Typography sx={textThirStyle}>Car Model</Typography>
              </Stack>
              <Stack>
                <Typography style={{ color: "#3F4145" }} sx={textStyle}>
                  Start date
                </Typography>
                <Typography style={{ color: "#3F4145" }} sx={textStyle}>
                  Product ID:
                </Typography>
              </Stack>
              <Stack>
                <Typography style={{ color: "#3F4145" }} sx={textStyle}>
                  Price:
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <AuctionMember />
        </Stack>
      </Stack>
    </Stack>
  );
};
