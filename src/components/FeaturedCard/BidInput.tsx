"use client";

import { Button, CircularProgress, Input, Stack } from "@mui/material";
import { Dispatch } from "react";

export const BidInput = ({
  bidOrder,
  setBidOrder,
  loading,
}: {
  bidOrder: string | undefined;
  setBidOrder: Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
}) => {
  return (
    <Stack gap={"3px"} justifyContent={"center"} direction={"row"}>
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
              width: 90,
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
