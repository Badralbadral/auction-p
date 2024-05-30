"use client";
import { Box, Input, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
const style = {
  mt: 1.4,
  width: 575,
  height: `fit-content`,
  bgcolor: "background.paper",
  borderRadius: `10px`,
  py: 1.8,
};
type dataType = {
  _id: number;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  endTime: string;
};

export const SearchModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<dataType[] | undefined>();
  const [activeSearch, setActiveSearch] = useState<dataType[] | undefined>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("https://auction-back-end.onrender.com/api/car");
      const cars = await res.json();
      setData(cars);
    }
    getData();
  }, []);

  const handleSearch = (e: any) => {
    if (e.target.value == ``) {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(
      data?.filter((w) => w.carModel.includes(e.target.value)).slice(0, 8)
    );
  };

  return (
    <Stack>
      <Stack
        direction={`row`}
        alignItems={`center`}
        justifyContent={`center`}
        bgcolor={`#f1f1f1`}
        borderRadius={`100px`}
        width={545}
        height={38}
        onClick={() => setOpen(true)}
        color={`#717171`}
        gap={1}
        sx={{ cursor: `text` }}
      >
        <SearchIcon sx={{ fontSize: 23 }} />
        Search Cars
      </Stack>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: 1,
          height: 1,
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <Box sx={style}>
          <Input
            onChange={(e) => handleSearch(e)}
            placeholder="Search Cars"
            sx={{ width: 475, borderBottom: `1px solid black`, pb: 1, mx: 4 }}
            disableUnderline
          ></Input>
          {activeSearch && activeSearch?.length > 0 && (
            <Stack sx={{ mt: 2 }} gap={1}>
              {activeSearch.map((s, index) => {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    key={index}
                    href={`cars/${s.brand}/${s._id}`}
                    onClick={() => setOpen(false)}
                  >
                    <Stack
                      direction={`row`}
                      alignItems={`center`}
                      color={`black`}
                      sx={{
                        cursor: `pointer`,
                        ":hover": { bgcolor: `#F1F1F1` },
                      }}
                      height={50}
                    >
                      <SearchIcon sx={{ color: `gray`, mr: 1.7, ml: 3 }} />
                      <Typography fontSize={18}>{s.carModel}</Typography>
                    </Stack>
                  </Link>
                );
              })}
            </Stack>
          )}
        </Box>
      </Modal>
    </Stack>
  );
};
