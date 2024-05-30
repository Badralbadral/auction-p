import { loginFields } from "@/utils/dumData";
import { Box, Stack } from "@mui/material";

export const LoginFields = ({ formik }: { formik: any }) => {
  return (
    <Stack mt={"27.5px"} mb={`40px`} gap={`16px`}>
      {loginFields.map((val) => {
        return (
          <Stack key={val.name}>
            <Box
              type={val.name == "email" ? "email" : "text"}
              fontSize={17}
              component={`input`}
              height={48}
              width={376}
              border={
                formik.touched.email && formik.errors.email
                  ? `1px solid #F74040`
                  : `1px solid #E0E0E0`
              }
              px={`17px`}
              placeholder={val.pl}
              id={`${val.name}`}
              {...formik.getFieldProps(`${val.name}`)}
            ></Box>
          </Stack>
        );
      })}
      <Stack fontSize={13} color={`#F74040`}>
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </Stack>
    </Stack>
  );
};
