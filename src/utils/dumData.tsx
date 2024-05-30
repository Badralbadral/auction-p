/* eslint-disable no-secrets/no-secrets */
import { FBook } from "@/svgs/Fbook";

export const fields = [
  { pl: "First name", name: "firstName" },
  { pl: "Last name", name: "lastName" },
  { pl: "Email", name: "email" },
];

export const signUpBtn = [{ text: "Continue with Facebook", svg: <FBook /> }];

export const SignUpNextStepInputs = [
  { pl: "Enter password", name: "enterPass" },
  { pl: "Confirm password", name: "confirmPass" },
];

export const language = ["English", "Mongolian"];
export const currency = ["USD", "MNT"];

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1220,
  height: `fit-content`,
  bgcolor: "background.paper",
  borderRadius: `12px`,
  p: 4,
};

export const inputs = [
  { label: "Car Model", name: "model" },
  { label: "About This Car", name: "desc" },
  { label: "information", name: "info" },
];

export const NumInputs = [
  { label: "Starting Bid Price", name: "price" },
  { label: "Time ends at:", name: "time" },
];

export const carDetails = [
  { label: "Year", name: "year" },
  { label: "Location", name: "location" },
  { label: "Address", name: "address" },
  { label: "Mileage", name: "mileage" },
  { label: "Engine", name: "engine" },
  { label: "Gearbox", name: "gearbox" },
  { label: "Car type", name: "carType" },
];

export const carDetailsSecod = [
  { label: "Drive", name: "drive" },
  { label: "Drive train", name: "driveTrain" },
  { label: "Fuel type", name: "fuelType" },
  { label: "Power", name: "power" },
  { label: "Condition", name: "condition" },
  { label: "Color", name: "color" },
  { label: "Interior color", name: "intColor" },
];

export const footerTitles = [
  "About",
  "Contact",
  "Careers",
  "Help & FAQ",
  "Terms",
  "Privacy",
];

export const footerSubtitles = ["sellWithUs", "Partner", "Linking"];

export const loginFields = [
  { pl: "Email", name: "email" },
  { pl: "Password", name: "password" },
];

export const LinkStyle = {
  textUnderlineOffset: `4.3px`,
  textDecorationColor: "rgba(120, 120, 120, 0.4)",
  transitionDuration: "0.22s",
  ":hover": {
    textDecorationColor: "black",
    transitionDuration: "0.22s",
  },
};

export const accParts = [
  "JUST FOR YOU",
  "SAVED LISTINGS",
  "SAVED SEARCHES",
  "SENT INQUIRIES",
  "ACCOUNT",
];

export const sellwithUsImg = [
  "https://static-x.jamesedition.com/assets/seller_landing/cars1-01bf0ee1dfc77f02182d9ec6284670bb5827e6a2263e2b8adf7a0aa8b09af0b4.png",
  "https://static-x.jamesedition.com/assets/seller_landing/cars2-c8af3d876ad629f3e1f61310d703ab9ecf062e3233f9b9b6e8d39e8097bc53b3.png",
];
