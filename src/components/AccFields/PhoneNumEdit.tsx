import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import { useEffect, useState } from "react";
type dataType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export const NameEdit = () => {
  const [item, setItem] = useState<string | null>(null);
  const [data, setData] = useState<Array<dataType>>();
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:4000/api/user");
      const users = await res.json();
      setData(users);
      const loggedUserEmail = localStorage.getItem("userEmail");
      setItem(loggedUserEmail);
    }
    getData();
  }, []);

  const filteredUser = data?.filter((val) => {
    return val.email == item;
  });
  return (
    <Stack direction={`row`} justifyContent={`space-between`}>
      <FormControl>
        <InputLabel sx={{ fontSize: 19, color: `#151515` }} shrink>
          First Name
        </InputLabel>
        <Input
          id="First Name"
          disableUnderline
          sx={{
            px: 1,
            width: 255,
            height: 46,
            border: `1px solid #e0e0e0`,
          }}
          defaultValue={filteredUser && filteredUser[0].firstName}
        />
      </FormControl>
    </Stack>
  );
};
