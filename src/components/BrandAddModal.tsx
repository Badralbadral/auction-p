"use client";
import { Button, Input, Modal, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { LoadingCover } from "./Loading";
const CLOUD_NAME = "dlfnavahp";
const UPLOAD_PRESET = "zas8prdn";

export const BrandAddModal = () => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        setImageUrl(resJson.url);
      }
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const brandData = {
      brandTitle: e.target.brand.value,
      img: imageUrl,
    };
    fetch("https://auction-back-end.onrender.com/api/brand", {
      method: "POST",
      body: JSON.stringify(brandData),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Stack mb={"40px"}>
      <Button
        sx={{
          width: 180,
          height: 48,
          bgcolor: `black`,
          borderRadius: `8px`,
          color: `white`,
          textTransform: `none`,
          fontSize: 16,
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Brand
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          {loading && <LoadingCover />}
          <Stack
            gap={`20px`}
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 420,
              height: `fit-content`,
              bgcolor: "background.paper",
              borderRadius: `12px`,
              p: 4,
            }}
          >
            <Stack direction={`row`} justifyContent={`space-between`}>
              <Input
                sx={{
                  bgcolor: `#F7F7F8`,
                  border: `1px solid #D6D8DB`,
                  fontSize: 18,
                  borderRadius: `8px`,
                  px: `12px`,
                  height: 38,
                  width: 210,
                }}
                disableUnderline
                name="brand"
              ></Input>
              <Button
                type="submit"
                sx={{
                  width: 121,
                  height: 38,
                  bgcolor: `black`,
                  borderRadius: `8px`,
                  color: `white`,
                  textTransform: `none`,
                  fontSize: 17,
                }}
              >
                Add Brand
              </Button>
            </Stack>
            <Stack
              border={`1px dashed #D6D8DB`}
              width={`full`}
              height={269}
              borderRadius={`4px`}
              p={1}
              sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
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
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
