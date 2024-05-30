import { useCarData, ContextType } from "@/context/DataContext";
import { Menu, MenuItem, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type dataType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const Logged = () => {
  const { scrolling, setItem, setFilteredUser } = useCarData() as ContextType;
  const [data, setData] = useState<Array<dataType>>();
  const [localItem, setLocalItem] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://auction-back-end.onrender.com/api/user");
      const users = await res.json();
      setData(users);
      const loggedUserEmail = localStorage.getItem("userEmail");
      setLocalItem(loggedUserEmail);
      setFilteredUser(
        users.filter((val: any) => {
          return val.email == localItem;
        })
      );
    }
    getData();
  }, [localItem, setFilteredUser]);

  const User = data?.filter((val) => {
    return val.email == localItem;
  });
  return (
    <Stack
      onMouseEnter={(event) => setAnchorEl(event.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
      position={`relative`}
    >
      <Stack
        height={`100%`}
        color={scrolling ? "black" : `white`}
        direction={`row`}
        alignItems={`center`}
        sx={
          scrolling
            ? {
                cursor: `pointer`,
                ":hover": {
                  borderBottom: `1px solid black`,
                },
              }
            : {
                cursor: `pointer`,
                ":hover": {
                  borderBottom: `1px solid white`,
                },
              }
        }
        justifyContent={`center`}
        fontSize={14}
      >
        {User && User[0]?.firstName}
        {open == false ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Stack>
      <Menu
        sx={{ position: `absolute`, left: -40 }}
        PaperProps={{
          style: {
            width: 200,
            borderRadius: 0,
            marginTop: 23,
            height: `fit-content`,
            boxShadow: `none`,
            border: `1px solid #e0e0e0`,
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ fontSize: 15, marginTop: 0.7 }} onClick={handleClose}>
          Saved Listings
        </MenuItem>
        <MenuItem
          sx={{ fontSize: 15, marginTop: 0.7 }}
          onClick={() => router.push(`/account`)}
        >
          Account
        </MenuItem>
        <MenuItem
          sx={{ fontSize: 15, marginTop: 0.7 }}
          onClick={() => {
            localStorage.clear();
            router.push(`/`);
            setItem(false);
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </Stack>
  );
};
