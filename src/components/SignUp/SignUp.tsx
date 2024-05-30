"use client";
import { Button, Divider, Input, Link, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fields, signUpBtn } from "@/utils/dumData";
import { useCarData, ContextType } from "@/context/DataContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dispatch } from "react";

export const SignUp = ({
  setHandle,
}: {
  setHandle: Dispatch<React.SetStateAction<string>>;
}) => {
  const { setOpen, open, setSignUpFields } = useCarData() as ContextType;

  const formik = useFormik({
    initialValues: {
      firstName: ``,
      lastName: ``,
      email: ``,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Enter your first name"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Enter your last name"),
      email: Yup.string()
        .email("email invalid")
        .required("Enter your email address"),
    }),
    onSubmit: (values) => {
      setSignUpFields(values);
      setHandle("createPass");
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
          Sign up
        </Typography>
        <Stack gap={`16px`} mb={`26px`}>
          {signUpBtn.map((val, index) => {
            return (
              <Button
                key={val.text}
                sx={{
                  color: `#151515`,
                  textTransform: `none`,
                  border: `1px solid #E0E0E0`,
                  width: 376,
                  height: 48,
                }}
              >
                <Stack position={`relative`} right={index == 0 ? 85 : 75}>
                  {val.svg}
                </Stack>
                <Typography fontSize={16} fontWeight={500}>
                  {val.text}
                </Typography>
              </Button>
            );
          })}
        </Stack>
        <Divider style={{ width: 376 }}>OR</Divider>
        <form onSubmit={formik.handleSubmit}>
          <Stack mt={"27.5px"} mb={`40px`} gap={`16px`}>
            {fields.map((val) => {
              return (
                <Input
                  disableUnderline
                  sx={{
                    fontSize: 17,
                    height: 48,
                    width: 376,
                    border:
                      formik.touched.email && formik.errors.email
                        ? `1px solid #F74040`
                        : `1px solid #E0E0E0`,
                    px: `17px`,
                  }}
                  key={val.name}
                  placeholder={val.pl}
                  id={`${val.name}`}
                  {...formik.getFieldProps(`${val.name}`)}
                />
              );
            })}
            <Stack fontSize={13} color={`#F74040`}>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </Stack>
          </Stack>
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
        </form>
        <Stack mt={3} direction={`row`} alignItems={`center`} gap={`4.6px`}>
          <Typography color={`#717171`} fontSize={14} fontWeight={400}>
            Already a member?
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
            onClick={() => setHandle("login")}
          >
            Log in
          </Link>
        </Stack>
      </Stack>
    </>
  );
};
