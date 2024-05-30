import { AccountFileds } from "@/components/AccFields/AccountFileds";
import { Stack } from "@mui/material";

const Page = () => {
  return (
    <Stack px={8}>
      <Stack mt={19} fontSize={28}>
        Account Settings
      </Stack>
      <AccountFileds />
    </Stack>
  );
};
export default Page;
