// import { CarDetail } from "@/components/CarDetailPage/CarDetail";
// import { CarInfo } from "@/components/CarDetailPage/CarInfo";
import { Contact } from "@/components/CarDetailPage/Contact";
import { Stack } from "@mui/material";

const Page = () => {
  return (
    <Stack width={"100%"} alignItems={"center"}>
      <Stack>
        {/* <CarDetail />
        <CarInfo /> */}
        <Contact />
      </Stack>
    </Stack>
  );
};
export default Page;
