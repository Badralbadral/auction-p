"use client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SignUpNextStepInputs } from "@/utils/dumData";
import { Dispatch, useState } from "react";
import { useCarData, ContextType } from "@/context/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const SignUpNextStep = ({
  setHandle,
}: {
  setHandle: Dispatch<React.SetStateAction<string>>;
}) => {
  const { setOpen, open, signUpFields, setItem } = useCarData() as ContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const success = () => toast.success("Successfully registered");

  const formik = useFormik({
    initialValues: {
      enterPass: ``,
      confirmPass: ``,
    },
    validationSchema: Yup.object({
      enterPass: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Enter your password"),
      confirmPass: Yup.string()
        .oneOf([Yup.ref("enterPass")], "Passwords must match")
        .required("Enter your confirmation password"),
    }),
    onSubmit: async (values) => {
      const userData = {
        firstName: signUpFields.firstName,
        lastName: signUpFields.lastName,
        email: signUpFields.email,
        password: values.enterPass,
      };
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      if (resJson.message) {
        setLoading(false);
        success();
        setOpen(false);
        localStorage.setItem("userEmail", userData.email);
        setItem(true);
        setHandle("login");
      }
    },
  });
  return (
    <Stack alignItems={`center`} width={425} height={610} pt={1.6} pb={5}>
      <CloseIcon
        onClick={() => {
          setOpen(!open);
          setHandle("login");
        }}
        sx={{ position: `relative`, left: 170, fontSize: 30 }}
      />
      <Typography mb={`9px`} fontSize={24} fontWeight={500}>
        Create password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt={"27.5px"} mb={`20px`}>
          <Stack mt={"27.5px"} mb={`6px`} gap={`16px`}>
            {SignUpNextStepInputs.map((val) => {
              return (
                <Box
                  fontSize={17}
                  key={val.name}
                  component={`input`}
                  height={48}
                  width={376}
                  border={
                    formik.touched.enterPass && formik.errors.enterPass
                      ? `1px solid #F74040`
                      : `1px solid #E0E0E0`
                  }
                  px={`17px`}
                  placeholder={val.pl}
                  id={`${val.name}`}
                  {...formik.getFieldProps(`${val.name}`)}
                ></Box>
              );
            })}
            <Stack fontSize={13} color={`#F74040`}>
              {formik.touched.enterPass && formik.errors.enterPass ? (
                <div>{formik.errors.enterPass}</div>
              ) : null}
              {formik.touched.confirmPass && formik.errors.confirmPass ? (
                <div>{formik.errors.confirmPass}</div>
              ) : null}
            </Stack>
          </Stack>
          <Typography
            width={346}
            color={`#717171`}
            fontSize={14}
            fontWeight={400}
          >
            8 characters or longer. Combine uppercase and lowercase letters.
          </Typography>
        </Stack>
        {loading ? (
          <CircularProgress sx={{ color: `black`, ml: 20 }} />
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
        <Typography
          mt={5}
          width={376}
          color={`#717171`}
          fontSize={14}
          fontWeight={400}
        >
          By joining, you agree to Prestige&apos;s{" "}
          <Link color={`#717171`}>Terms of Service</Link> and{" "}
          <Link color={`#717171`}>Privacy Policy</Link>, as well as to receive
          occasional emails from us.
        </Typography>
      </form>
      <Divider sx={{ mt: 5 }} variant="middle" flexItem />
      <Stack mt={3} direction={`row`} alignItems={`center`} gap={`4.6px`}>
        <Typography color={`#717171`} fontSize={14} fontWeight={400}>
          Already a member?
        </Typography>
        <Link
          onClick={() => setHandle("login")}
          sx={{
            cursor: `pointer`,
            color: `black`,
            textUnderlineOffset: `4.3px`,
            textDecorationColor: "rgba(120, 120, 120, 0.4)",
            transitionDuration: "0.22s",
            ":hover": {
              textDecorationColor: "black",
              transitionDuration: "0.3s",
            },
          }}
          fontSize={14}
          fontWeight={400}
        >
          Log in
        </Link>
      </Stack>
    </Stack>
  );
};
