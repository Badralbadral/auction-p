"use client";

import {
  Button,
  CircularProgress,
  Input,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Dispatch } from "react";

export const BidInputForDetail = ({
  bidOrder,
  setBidOrder,
  loading,
}: {
  bidOrder: string | undefined;
  setBidOrder: Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack
      borderTop={"1px solid grey"}
      position={isMobile ? "fixed" : "static"}
      p={1}
      bottom={isMobile ? 0 : "auto"}
      bgcolor={"white"}
      width={"100vw"}
      zIndex={1000}
      gap={"18px"}
      justifyContent={"center"}
      direction={"row"}
    >
      <Input
        id="bidNum"
        value={bidOrder || ``}
        onChange={(e) => setBidOrder(e.target.value)}
        type="number"
        placeholder="Max bid(usd)"
        disableUnderline
        sx={{
          border: "0.1px solid grey",
          borderRadius: "5px",
          px: "10px",
          height: "40px",
          width: 1,
        }}
      ></Input>
      <Stack>
        {loading ? (
          <CircularProgress sx={{ color: `#006C75` }} />
        ) : (
          <Button
            type="submit"
            sx={{
              backgroundColor: "#006C75",
              color: "white",
              height: "40px",
              width: 120,
              fontSize: 12,
              ":hover": {
                backgroundColor: `#006C75b3`,
              },
            }}
          >
            Place Bid
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
