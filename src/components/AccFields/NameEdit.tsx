import { Button, Input, Stack, Typography } from "@mui/material";
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
    <Stack gap={2.6}>
      <Stack direction={`row`} justifyContent={`space-between`} mt={2}>
        <Stack gap={1}>
          <Typography sx={{ fontSize: 14, color: `#151515` }}>
            First Name
          </Typography>
          <Input
            id="First Name"
            disableUnderline
            sx={{
              px: 2.3,
              width: 257,
              height: 46,
              border: `1px solid #e0e0e0`,
            }}
            defaultValue={filteredUser && filteredUser[0].firstName}
          />
        </Stack>
        <Stack gap={1}>
          <Typography sx={{ fontSize: 14, color: `#151515` }}>
            Last Name
          </Typography>
          <Input
            id="age"
            disableUnderline
            sx={{
              px: 2.3,
              width: 257,
              height: 46,
              border: `1px solid #e0e0e0`,
            }}
            defaultValue={filteredUser && filteredUser[0].lastName}
          />
        </Stack>
      </Stack>
      <Button
        sx={{
          bgcolor: `black`,
          color: `white`,
          width: 119,
          height: 48,
          borderRadius: 0,
          fontSize: 13,
        }}
      >
        Save
      </Button>
    </Stack>
  );
};
