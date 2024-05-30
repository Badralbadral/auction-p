import { Input, Stack } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useCarData, ContextType } from "@/context/DataContext";
import { LoadingCover } from "../Loading";

const CLOUD_NAME = "dlfnavahp";
const UPLOAD_PRESET = "zas8prdn";

export const AddImg = () => {
  const {
    imageUrlOne,
    setImageUrlOne,
    imageUrlTwo,
    setImageUrlTwo,
    imageUrlThree,
    setImageUrlThree,
    imageUrlFour,
    setImageUrlFour,
  } = useCarData() as ContextType;
  const [index, setIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const images = ["One", "Two", "Three", "Four"];

  const fileChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event?.target?.files) {
      setLoading(true);
      const data = new FormData();
      data.append("file", event.target.files[0]);
      data.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const resJson = await res.json();
      if (resJson.url) {
        {
          index == 0
            ? setImageUrlOne(resJson.url)
            : index == 1
            ? setImageUrlTwo(resJson.url)
            : index == 2
            ? setImageUrlThree(resJson.url)
            : setImageUrlFour(resJson.url);
        }
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingCover />}
      <Stack direction={"row"} gap={1}>
        {images.map((value, index) => {
          return (
            <Stack
              onClick={() => setIndex(index)}
              key={index}
              width={135}
              height={175}
              border={`1px dashed #D6D8DB`}
              borderRadius={`16px`}
              alignItems={`center`}
              justifyContent={`center`}
              sx={{
                backgroundImage: `url(${
                  index == 0
                    ? imageUrlOne
                    : index == 1
                    ? imageUrlTwo
                    : index == 2
                    ? imageUrlThree
                    : imageUrlFour
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Stack
                component={`label`}
                alignItems={`center`}
                justifyContent={`center`}
                sx={{
                  width: "32px",
                  height: "32px",
                  bgcolor: `#ECEDF0`,
                  borderRadius: `120%`,
                  color: `black`,
                }}
              >
                <AddIcon />
                <Input
                  sx={{ display: "none" }}
                  type="file"
                  onChange={fileChangeHandler}
                />
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
