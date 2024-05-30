import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const DropDown = () => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          //   defaultValue={20}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default DropDown;
