import { inputs } from "@/utils/dumData";
import { Box, Input, Stack, Typography } from "@mui/material";
import { AddImg } from "./AddImg";
import { RInputs } from "./RInputs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCarData, ContextType } from "@/context/DataContext";

interface infoType {
  _id: string;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  userId: string;
  endTime: string;
}

export const Inputs = ({ carInfo }: { carInfo: infoType }) => {
  const { setEndDate, endDate } = useCarData() as ContextType;
  return (
    <>
      <Stack width={`593px`} gap={`24px`}>
        <Stack height={`fit-content`} gap={`16px`}>
          {inputs.map((val) => {
            return (
              <Stack key={val.name}>
                <Typography mb={`8px`} fontSize={16} fontWeight={600}>
                  {val.label}
                </Typography>
                <Box
                  defaultValue={
                    val.label === "Car Model"
                      ? carInfo.carModel
                      : val.label === "About This Car"
                      ? carInfo.description
                      : carInfo._id
                  }
                  component="textarea"
                  bgcolor="#F7F7F8"
                  border="1px solid #D6D8DB"
                  borderRadius="8px"
                  px="12px"
                  py="10px"
                  fontSize={18}
                  height={val.label === "About This Car" ? 128 : 44}
                  name={val.name}
                  sx={{ resize: "none", outline: "none" }}
                ></Box>
              </Stack>
            );
          })}
        </Stack>
        <Stack height={`213px`}>
          <Typography mb={`8px`} fontSize={16} fontWeight={600}>
            Car Image
          </Typography>
          <AddImg />
        </Stack>
        <Stack height={`fit-content`} direction={`row`} gap={`16px`}>
          <Stack>
            <Typography mb={`8px`} fontSize={16} fontWeight={600}>
              Starting Bid Price
            </Typography>
            <Input
              defaultValue={carInfo.startPrice}
              disableUnderline
              name="price"
              type="number"
              sx={{
                outline: `none`,
                bgcolor: `#F7F7F8`,
                border: `1px solid #D6D8DB`,
                borderRadius: `8px`,
                px: `12px`,
                py: `10px`,
                fontSize: 18,
                width: 249,
                height: 44,
              }}
            ></Input>
          </Stack>
          <Stack>
            <Typography fontSize={16} fontWeight={600}>
              Auction ends at:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  ampm={false}
                  value={endDate}
                  disablePast
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Typography></Typography>
          </Stack>
        </Stack>
      </Stack>
      <RInputs carInfo={carInfo} />
    </>
  );
};
