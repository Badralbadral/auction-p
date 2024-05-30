"use client";
import {
  Button,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCarData, ContextType } from "@/context/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContinueWith } from "./ContinueWith";
import { toast } from "react-toastify";
import { Dispatch, useState } from "react";
import { LoginFields } from "./LoginFields";
export const Login = ({
  setHandle,
}: {
  setHandle: Dispatch<React.SetStateAction<string>>;
}) => {
  const { setOpen, open, setItem } = useCarData() as ContextType;
  const failed = () => toast.error("Invalid email or password");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email invalid")
        .required("Enter your email address"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Enter your password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", data.userEmail);
        setOpen(!open);
        setItem(true);
      } else {
        failed();
        setItem(false);
      }
    },
  });

  return (
    <>
      <Stack
        alignItems={`center`}
        width={424}
        height={`fit-content`}
        pt={1.6}
        pb={5}
      >
        <CloseIcon
          onClick={() => {
            setOpen(!open);
            setHandle("login");
          }}
          sx={{ position: `relative`, left: 170, fontSize: 30 }}
        />
        <Typography mb={`32px`} fontSize={24} fontWeight={500}>
          Log in
        </Typography>
        <ContinueWith />
        <Divider style={{ width: 376 }}>OR</Divider>
        <form onSubmit={formik.handleSubmit}>
          <LoginFields formik={formik} />
          <Stack alignItems={`center`}>
            {loading ? (
              <CircularProgress sx={{ color: `black` }} />
            ) : (
              <Button
                type="submit"
                sx={{
                  bgcolor: `#151515`,
                  color: `white`,
                  textTransform: `none`,
                  width: 376,
                  height: 53.5,
                  fontSize: 16,
                }}
              >
                Continue
              </Button>
            )}
          </Stack>
        </form>
        <Stack mt={`16px`} alignItems={`center`}>
          <Typography
            mb={`42.5px`}
            color={`#151515`}
            fontSize={14}
            fontWeight={400}
          >
            Forgot password?
          </Typography>
          <Divider sx={{ width: 376 }} />
          <Stack
            mt={`20px`}
            direction={`row`}
            alignItems={`center`}
            gap={`4.6px`}
          >
            <Typography color={`#717171`} fontSize={14} fontWeight={400}>
              Not a member yet?
            </Typography>
            <Link
              sx={{
                cursor: `pointer`,
                color: `black`,
                textUnderlineOffset: `4.3px`,
                textDecorationColor: "rgba(120, 120, 120, 0.4)",
                transitionDuration: "0.22s",
                ":hover": {
                  textDecorationColor: "black",
                  transitionDuration: "0.22s",
                },
              }}
              fontSize={14}
              fontWeight={400}
              onClick={() => setHandle("signup")}
            >
              Sign up
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
