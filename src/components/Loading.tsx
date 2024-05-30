import { Stack, Typography, CircularProgress } from "@mui/material";

export const LoadingCover = () => {
  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "101vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Typography color={`white`}>Loading..</Typography>
      <CircularProgress />
    </Stack>
  );
};
