"use client";
import { Divider, Stack, Typography } from "@mui/material";
import { CarouselSlider } from "./CarouselSlider";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { BidField } from "./BidField";
import { NumericFormat } from "react-number-format";
import { Bids } from "./Bids";
import { useCarData, ContextType } from "@/context/DataContext";
import { BidInput } from "./BidInput";
import { toast } from "react-toastify";
import NewTimer from "./NewTimer";
export const FeaturedCard = ({
  _id,
  carModel,
  startPrice,
  img,
  carDetail,
  endDate,
  brand,
  bidContestants,
}: {
  _id: string;
  carModel: string;
  startPrice: number;
  img: string[];
  carDetail: string[];
  endDate: string;
  brand: string;
  bidContestants: Array<{}>;
}) => {
  const [bidOrder, setBidOrder] = useState<string>();
  const [newBid, setNewBid] = useState<string | undefined>(undefined);
  const [auctionId, setAuctionId] = useState();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextBid, setNextBid] = useState<number>();
  const { item } = useCarData() as ContextType;
  const failed = () => toast.error("Your order must be next minimum or more");
  const mustLogged = () => toast.error("You must be logged");
  const succesfully = () => toast.success("Your order succesfully placed");
  const [end, setEnd] = useState(true);

  const expiryTimestamp = new Date(endDate);

  function findMaxBidUser(bids: any) {
    let maxBidPrice = -Infinity;
    let maxBidUser = null;
    for (let i = 0; i < bids.length; i++) {
      const currentBid = bids[i];
      if (currentBid && typeof currentBid.bidPrice === "string") {
        const currentBidPrice = parseFloat(currentBid.bidPrice);
        if (!isNaN(currentBidPrice) && currentBidPrice > maxBidPrice) {
          maxBidPrice = currentBidPrice;
          maxBidUser = currentBid.userEmail;
        }
      }
    }
    return maxBidUser;
  }
  function date() {
    const currentTime = new Date();
    currentTime.setSeconds(0, 0);

    if (currentTime.toLocaleString() === new Date(endDate).toLocaleString()) {
      console.log("true");
      const highestBidUser = findMaxBidUser(bidContestants);
      fetch("http://localhost:4000/api/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          email: highestBidUser,
          carId: _id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("User with the highest bid:", highestBidUser);
      clearInterval(intervalId);
    }
  }
  const intervalId = setInterval(() => {
    date();
  }, 1000);
  useEffect(() => {
    const socket = io("https://socketbackend-hfon.onrender.com", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Connected to socket");
    });
    socket.on("chat-message", (data) => {
      setAuctionId(data._id);
      setNewBid(data.bidOrder);
      setNextBid(Number(data.bidOrder) + (Number(data.bidOrder) * 10) / 100);
      setLoading(false);
    });
    setUserEmail(localStorage.getItem("userEmail"));
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var today = new Date();
    today.setSeconds(0, 0);
    const options = {
      timeZone: "Asia/Ulaanbaatar",
      hourCycle: "h24" as const,
      month: "2-digit" as const,
      day: "2-digit" as const,
      year: "numeric" as const,
      hour: "2-digit" as const,
      minute: "2-digit" as const,
    };
    const presentTime = today.toLocaleString("en-US", options);
    const carInfo = {
      id: _id,
      startPrice: bidOrder,
      email: userEmail,
      bidCreatedAt: presentTime,
    };
    if (item == false) {
      mustLogged();
    } else if (
      (bidOrder && Number(bidOrder) >= startPrice) ||
      (nextBid && bidOrder !== ``)
    ) {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/car", {
        method: "PUT",
        body: JSON.stringify(carInfo),
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      const socket = io("https://socketbackend-hfon.onrender.com", {
        transports: ["websocket"],
      });
      socket.emit("send-bid-message", { bidOrder, _id });
      if (resJson.message) {
        succesfully();
        setBidOrder(``);
      }
    } else {
      failed();
    }
  };
  let other = startPrice + (startPrice * 10) / 100;

  return (
    <Stack border={"1px solid #e0e0e0"}>
      <CarouselSlider img={img} _id={_id} brand={brand} />
      <Stack px={3} py={3} gap={"10px"}>
        <Stack direction={"row"} justifyContent={"space-between"} mt={"10px"}>
          <Stack justifyContent={"center"}>
            <Typography fontWeight={700}>{carModel}</Typography>
            <Typography color={"#606060"}>{carDetail[1]}</Typography>
          </Stack>
          {end == false ? (
            ""
          ) : (
            <form onSubmit={handleSubmit}>
              <BidInput
                bidOrder={bidOrder}
                setBidOrder={setBidOrder}
                loading={loading}
              />
            </form>
          )}
        </Stack>
        <Stack direction={"row"} mt={"10px"} justifyContent={`space-between`}>
          <Stack gap={0.4}>
            <BidField
              label={"Current bid"}
              id={_id}
              auctionId={auctionId}
              bid={newBid}
              dataPrice={startPrice}
            />
            <Stack direction={"row"} gap={"5px"} alignItems={"center"}>
              <Typography noWrap>Next minimum bid</Typography>
              <NumericFormat
                value={_id == auctionId ? nextBid : other}
                thousandSeparator=","
                suffix="$"
                disabled
                style={{
                  border: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "black",
                  width: `95px`,
                  backgroundColor: `white`,
                }}
              />
            </Stack>
          </Stack>
          <Divider sx={{ bgcolor: `gray` }} orientation="vertical" flexItem />
          <Stack gap={0.4}>
            <NewTimer
              expiryTimestampq={expiryTimestamp}
              end={end}
              setEnd={setEnd}
            />
            <Bids id={_id} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
