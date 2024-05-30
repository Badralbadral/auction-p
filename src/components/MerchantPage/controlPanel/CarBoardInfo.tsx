import { ButtonBase, Stack, Typography } from "@mui/material";
import * as React from "react";
import { ArrowBlack, Trash } from "@/svgs";
import { useRouter } from "next/navigation";
import { CarEditModal } from "@/components/CarEditModal/CarEditModal";

interface infoType {
  _id: string;
  carModel: string;
  brand: string;
  startPrice: number;
  description: string;
  carDetails: [string];
  img: [string];
  userId: string;
  endTime: string;
}

const fontStyle = {
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "20px",
  color: "#3F4145",
};

export const CarBoardInfo = () => {
  const [infos, setInfo] = React.useState<infoType[]>([]);
  const [auctionID, setAuctionID] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:4000/api/car`);
        const data = await res.json();
        setInfo(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const carInfos = {
      id: auctionID,
    };
    fetch("http://localhost:4000/api/car", {
      method: "DELETE",
      body: JSON.stringify(carInfos),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Stack>
      {infos.map((info, index) => (
        <Stack
          key={index}
          borderBottom={"1px solid #ECEDF0"}
          direction={"row"}
          height={"80px"}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            width={"100px"}
          >
            <Typography sx={fontStyle}>{index + 1}</Typography>
          </Stack>
          <Stack p={"0px 20px"} justifyContent={"center"} width={"200px"}>
            <Typography sx={fontStyle}>{info.brand}</Typography>
          </Stack>
          <Stack justifyContent={"center"} width={"250px"}>
            <Typography sx={fontStyle}>{info.carModel}</Typography>
          </Stack>
          <Stack p={"0px 20px"} justifyContent={"center"} width={"200px"}>
            <Typography sx={fontStyle}>{"$" + info.startPrice}</Typography>
          </Stack>
          <Stack p={"0px 20px"} justifyContent={"center"} width={"200px"}>
            <Typography sx={fontStyle}>2024-01-10</Typography>
          </Stack>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={"130px"}
          >
            <Typography
              sx={{
                padding: "4px 10px",
                borderRadius: "50px",
                bgcolor: "#C1E6CF",
                marginRight: "50px",
              }}
            >
              Sell
            </Typography>
          </Stack>
          <Stack gap={"12px"} alignItems={"center"} direction={"row"}>
            <ButtonBase
              onMouseEnter={() => setAuctionID(info._id)}
              onClick={handleDelete}
              sx={{ borderRadius: "7px", p: "7px" }}
            >
              <Trash />
            </ButtonBase>
            <CarEditModal carInfos={info} />
          </Stack>
          <Stack justifyContent={"center"} width={"140px"}>
            <ButtonBase
              onClick={() => router.push(`/merchant/details/${info._id}`)}
              sx={{ borderRadius: "30px" }}
            >
              <ArrowBlack />
            </ButtonBase>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
