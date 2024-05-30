import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const FooterSelect = ({ data }: { data: string[] }) => {
  const [age, setAge] = React.useState(data[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ color: "white", fontSize: "14px", fontWeight: 400 }}
        >
          {data.map((a, index) => {
            return (
              <MenuItem value={a} key={index}>
                {a}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
