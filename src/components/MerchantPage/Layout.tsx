"use client";

import { Stack } from "@mui/material";
import { AdminHeader } from "../AdminHeader";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack alignItems={"center"}>
      <AdminHeader />

      {children}
    </Stack>
  );
};
