"use client";

import { Divider, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import { MenuDrawer } from "./MenuDrawer";
import { LoginModal } from "./LoginModal";
import { SearchModal } from "../Header/SearchModal";

export const HeaderDiff = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Stack
      sx={{ transition: `all 0.3s ease` }}
      width={1}
      position={`fixed`}
      zIndex={100}
      alignItems={`center`}
      bgcolor={`white`}
    >
      <Stack
        height={66}
        width={1}
        direction={`row`}
        alignItems={`center`}
        px={isMobile ? 2 : 7}
        justifyContent={`space-between`}
        bgcolor={`transparent`}
      >
        <Stack direction={`row`}>
          {isMobile && <MenuDrawer />}
          <Link href="/" sx={{ textDecoration: "none" }}>
            <Typography
              color={"black"}
              fontSize={isMobile ? 18 : 24}
              width={140}
              sx={{ cursor: `pointer` }}
            >
              Prestige
            </Typography>
          </Link>
        </Stack>
        {!isMobile && <SearchModal />}
        <Stack height={`100%`} direction={`row`} alignItems={`center`} gap={3}>
          {!isMobile && (
            <Stack
              height={`100%`}
              color={"black"}
              sx={{
                cursor: `pointer`,
                ":hover": {
                  borderBottom: `1px solid black`,
                },
              }}
              justifyContent={`center`}
              fontSize={14}
            >
              Sell With Us
            </Stack>
          )}
          <LoginModal />
        </Stack>
      </Stack>
      <Divider
        style={{ width: "100%" }}
        sx={{ bgcolor: `rgba(255, 255, 255, .2)`, height: 1.5 }}
      ></Divider>
    </Stack>
  );
};
