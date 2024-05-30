import { UserSvg } from "@/svgs/User";
import { Box, Modal, Stack } from "@mui/material";
import { SignUp } from "../SignUp/SignUp";
import { useCarData, ContextType } from "@/context/DataContext";
import { Login } from "../Login/Login";
import { SignUpNextStep } from "../SignUp/SignUpNextStep";
import { useState } from "react";
import { LoggedForDiff } from "../Login/LoggedForDiff";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const LoginModal = () => {
  const { open, setOpen, item } = useCarData() as ContextType;
  const [handle, setHandle] = useState<string>("login");

  return (
    <>
      {item ? (
        <LoggedForDiff />
      ) : (
        <Stack
          width={94.21}
          height={38}
          border={`1px solid #006C75`}
          justifyContent={`center`}
          borderRadius={`100px`}
          sx={{ cursor: `pointer` }}
        >
          <Stack
            width={"100%"}
            height={"100%"}
            onClick={() => setOpen(true)}
            direction={`row`}
            gap={1}
            alignItems={`center`}
            justifyContent={`center`}
            color={"black"}
            fontSize={14}
          >
            <UserSvg />
            Log in
          </Stack>
          <Modal open={open}>
            <Box sx={style}>
              {handle == "login" ? (
                <Login setHandle={setHandle} />
              ) : handle == "signup" ? (
                <SignUp setHandle={setHandle} />
              ) : (
                <SignUpNextStep setHandle={setHandle} />
              )}
            </Box>
          </Modal>
        </Stack>
      )}
    </>
  );
};
