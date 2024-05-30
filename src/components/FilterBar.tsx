import { Stack } from "@mui/material";
import DropDown from "./DropDown";

const FilterBar = () => {
  return (
    <Stack maxWidth={1920}>
      {" "}
      <Stack
        height={"54px"}
        width={"100%"}
        direction={"row"}
        padding={"10px 0"}
      >
        <DropDown />
      </Stack>
    </Stack>
  );
};

export default FilterBar;
