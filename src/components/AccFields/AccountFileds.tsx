"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NameEdit } from "./NameEdit";
type dataType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export const AccountFileds = () => {
  const [item, setItem] = useState<string | null>(null);
  const [data, setData] = useState<Array<dataType>>();
  const [names, setNames] = useState<boolean>(true);
  const [number, setNumber] = useState<boolean>(true);

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
  const fieldStyle = {
    alignItems: `center`,
    justifyContent: `space-between`,
  };

  return (
    <Stack mb={10}>
      <Stack
        py={`20px`}
        width={545}
        height={`fit-content`}
        borderBottom={`1px solid #e0e0e0`}
        gap={0.09}
      >
        <Stack direction={`row`} style={fieldStyle}>
          <Typography fontSize={18}>Your name</Typography>
          <Button
            onClick={() => setNames(!names)}
            sx={{ color: `#006c75`, fontSize: 16, textTransform: `none` }}
          >
            {names ? `Edit` : `Cancel`}
          </Button>
        </Stack>
        {names ? (
          <Stack direction={`row`} gap={1} color={`#606060`}>
            <Typography>{filteredUser && filteredUser[0].firstName}</Typography>
            <Typography>{filteredUser && filteredUser[0].lastName}</Typography>
          </Stack>
        ) : (
          <NameEdit />
        )}
      </Stack>
      <Stack
        width={545}
        height={`fit-content`}
        py={`20px`}
        borderBottom={`1px solid #e0e0e0`}
        gap={0.09}
      >
        <Stack direction={`row`} style={fieldStyle}>
          <Typography fontSize={18}>Your email</Typography>
          <Button
            sx={{
              color: `#adadad`,
              fontSize: 16,
              textTransform: `none`,
              cursor: `no-drop`,
            }}
          >
            Edit
          </Button>
        </Stack>
        <Typography color={`#606060`}>
          {filteredUser && filteredUser[0].email}
        </Typography>
      </Stack>
      <Stack
        width={545}
        height={`fit-content`}
        py={`20px`}
        borderBottom={`1px solid #e0e0e0`}
        gap={0.09}
      >
        <Stack direction={`row`} style={fieldStyle}>
          <Typography fontSize={18}>Your phone number</Typography>
          <Button
            onClick={() => setNumber(!number)}
            sx={{ color: `#006c75`, fontSize: 16, textTransform: `none` }}
          >
            {number ? `Edit` : `Cancel`}
          </Button>
        </Stack>
      </Stack>
      <Stack
        width={545}
        height={`fit-content`}
        py={`20px`}
        borderBottom={`1px solid #e0e0e0`}
        gap={0.09}
      >
        <Stack direction={`row`} style={fieldStyle}>
          <Typography fontSize={18}>Password</Typography>
          <Button
            sx={{ color: `#006c75`, fontSize: 16, textTransform: `none` }}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
