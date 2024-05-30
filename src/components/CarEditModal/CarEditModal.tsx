"use client";
import { modalStyle } from "@/utils/dumData";
import { ButtonBase, Modal, Stack } from "@mui/material";
import { useState } from "react";
import { Inputs } from "./Inputs";
import { useCarData, ContextType } from "@/context/DataContext";
import { Edith } from "@/svgs";
import { toast } from "react-toastify";

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

export const CarEditModal = ({ carInfos }: { carInfos: infoType }) => {
  const success = () => toast.success("Succesfully updated");
  const {
    selected,
    imageUrlOne,
    imageUrlTwo,
    imageUrlThree,
    imageUrlFour,
    endDate,
    setImageUrlOne,
    setImageUrlTwo,
    setImageUrlThree,
    setImageUrlFour,
    setSelected,
  } = useCarData() as ContextType;

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    var today = new Date();
    today.setSeconds(0, 0);
    const options = {
      timeZone: "Asia/Ulaanbaatar",
      hour12: false,
    };
    const mongoliaTime = today.toLocaleString("en-GB", options);

    const carInfo = {
      userId: "662493855942867ee5ccfd65",
      id: carInfos._id,
      carModel: e.target.model.value,
      description: e.target.desc.value,
      information: e.target.info.value,
      startPrice: e.target.price.value,
      endTime: endDate?.format("MM/DD/YYYY, hh:mm:ss"),
      createdAt: mongoliaTime,
      brand: selected,
      img: [imageUrlOne, imageUrlTwo, imageUrlThree, imageUrlFour],
      carDetails: [
        e.target.year.value,
        e.target.location.value,
        e.target.address.value,
        e.target.mileage.value,
        e.target.engine.value,
        e.target.gearbox.value,
        e.target.carType.value,
        e.target.drive.value,
        e.target.driveTrain.value,
        e.target.fuelType.value,
        e.target.power.value,
        e.target.condition.value,
        e.target.color.value,
        e.target.intColor.value,
      ],
    };
    console.log(carInfo);
    const res = await fetch("http://localhost:4000/api/car", {
      method: "PUT",
      body: JSON.stringify(carInfo),
      headers: { "Content-Type": "application/json" },
    });
    const resjson = await res.json();
    if (resjson.message) {
      success();
      setOpen(false);
    }
  };

  return (
    <Stack>
      <ButtonBase
        sx={{ borderRadius: "7px", p: "7px" }}
        onClick={() => {
          setOpen(true);
          setImageUrlOne(carInfos.img[0]);
          setImageUrlTwo(carInfos.img[1]);
          setImageUrlThree(carInfos.img[2]);
          setImageUrlFour(carInfos.img[3]);
          setSelected(`${carInfos.brand}`);
        }}
      >
        <Edith />
      </ButtonBase>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <Stack direction={`row`} gap={`24px`} sx={modalStyle}>
            <Inputs carInfo={carInfos} />
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
