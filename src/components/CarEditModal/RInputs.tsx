import { useCarData, ContextType } from "@/context/DataContext";
import { carDetails, carDetailsSecod } from "@/utils/dumData";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface infoType {
  _id: string;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: string[];
  img: string[];
  userId: string;
}

const fields = [carDetails, carDetailsSecod];

type dataType = { brandTitle: string; img: string };

export const RInputs = ({ carInfo }: { carInfo: infoType }) => {
  const { selected, setSelected } = useCarData() as ContextType;
  const [data, setData] = useState<dataType[]>();
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:4000/api/brand");
      const brands = await res.json();
      setData(brands);
    }
    getData();
  }, []);

  return (
    <Stack width={`573px`} gap={`24px`}>
      <Stack height={`fit-content`}>
        <Typography mb={`8px`} fontSize={16} fontWeight={600}>
          Car Brand
        </Typography>
        <FormControl sx={{ mb: 3 }}>
          <InputLabel>Brands</InputLabel>
          <Select sx={{ bgcolor: `#F4F4F4` }} required value={selected ?? ``}>
            {data?.map((val) => {
              return (
                <MenuItem
                  key={val.img}
                  value={val.brandTitle ?? ""}
                  onClick={() => setSelected(val.brandTitle)}
                >
                  {val.brandTitle}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Typography mb={`8px`} fontSize={16} fontWeight={600}>
          Car Details
        </Typography>
        <Stack direction={`row`} justifyContent={`space-between`}>
          {fields.map((value, index) => {
            return (
              <Stack key={index} mr={2}>
                {value.map((val) => {
                  return (
                    <Stack
                      key={val.name}
                      direction={`row`}
                      justifyContent={`space-between`}
                      alignItems={`center`}
                      mb={1}
                    >
                      <Typography mr={1} mb={`8px`} fontSize={16}>
                        {val.label}:
                      </Typography>
                      <Box
                        defaultValue={
                          val.label == "Year"
                            ? carInfo.carDetails[0]
                            : val.label == "Location"
                            ? carInfo.carDetails[1]
                            : val.label == "Address"
                            ? carInfo.carDetails[2]
                            : val.label == "Mileage"
                            ? carInfo.carDetails[3]
                            : val.label == "Engine"
                            ? carInfo.carDetails[4]
                            : val.label == "Gearbox"
                            ? carInfo.carDetails[5]
                            : val.label == "Drive"
                            ? carInfo.carDetails[6]
                            : val.label == "Drive train"
                            ? carInfo.carDetails[7]
                            : val.label == "Fuel type"
                            ? carInfo.carDetails[8]
                            : val.label == "Power"
                            ? carInfo.carDetails[9]
                            : val.label == "Condition"
                            ? carInfo.carDetails[10]
                            : val.label == "Color"
                            ? carInfo.carDetails[11]
                            : val.label == "Interior color"
                            ? carInfo.carDetails[12]
                            : carInfo.carDetails[13]
                        }
                        component={"input"}
                        width={190}
                        bgcolor={`#F7F7F8`}
                        border={`1px solid #D6D8DB`}
                        borderRadius={`8px`}
                        px={`12px`}
                        py={`10px`}
                        fontSize={18}
                        height={44}
                        name={val.name}
                        sx={{ outline: `none` }}
                      ></Box>
                    </Stack>
                  );
                })}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction={`row`} gap={`8px`} justifyContent={`flex-end`}>
        <Button
          type="reset"
          sx={{
            width: 121,
            height: 48,
            borderRadius: `8px`,
            textTransform: `none`,
            fontSize: 18,
            color: `black`,
            border: `1px solid #D6D8DB`,
          }}
        >
          Clear
        </Button>
        <Button
          type="submit"
          sx={{
            width: 121,
            height: 48,
            bgcolor: `black`,
            borderRadius: `8px`,
            color: `white`,
            textTransform: `none`,
            fontSize: 18,
          }}
        >
          Declare
        </Button>
      </Stack>
    </Stack>
  );
};
