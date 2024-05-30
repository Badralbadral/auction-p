"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dayjs } from "dayjs";
type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
};
type dataType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type ContextType = {
  selected: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
  imageUrlOne: string;
  setImageUrlOne: Dispatch<React.SetStateAction<string>>;
  imageUrlTwo: string;
  setImageUrlTwo: Dispatch<React.SetStateAction<string>>;
  imageUrlThree: string;
  setImageUrlThree: Dispatch<React.SetStateAction<string>>;
  imageUrlFour: string;
  setImageUrlFour: Dispatch<React.SetStateAction<string>>;
  endDate: Dayjs | null;
  setEndDate: Dispatch<React.SetStateAction<Dayjs | null>>;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  scrolling: boolean;
  setScrolling: Dispatch<React.SetStateAction<boolean>>;
  signUpFields: SignUpType;
  setSignUpFields: Dispatch<React.SetStateAction<SignUpType>>;
  item: boolean;
  setItem: Dispatch<React.SetStateAction<boolean>>;
  filteredUser: dataType | undefined;
  setFilteredUser: Dispatch<React.SetStateAction<dataType | undefined>>;
  checkSold: string | undefined;
  setCheckSold: Dispatch<React.SetStateAction<string | undefined>>;
};

const CarContext = createContext<ContextType | null>(null);
export const useCarData = () => useContext(CarContext);

const CarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<string>("");
  const [imageUrlOne, setImageUrlOne] = useState<string>("");
  const [imageUrlTwo, setImageUrlTwo] = useState<string>("");
  const [imageUrlThree, setImageUrlThree] = useState<string>("");
  const [imageUrlFour, setImageUrlFour] = useState<string>("");
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [signUpFields, setSignUpFields] = useState<SignUpType>({
    email: ``,
    firstName: ``,
    lastName: ``,
  });
  const [item, setItem] = useState<boolean>(false);
  const [filteredUser, setFilteredUser] = useState<dataType | undefined>();
  const [checkSold, setCheckSold] = useState<string | undefined>(``);

  useEffect(() => {
    async function getData() {
      setItem(localStorage.getItem("userEmail") ? true : false);
    }
    getData();
  }, []);
  return (
    <CarContext.Provider
      value={{
        selected,
        setSelected,
        imageUrlOne,
        setImageUrlOne,
        imageUrlTwo,
        setImageUrlTwo,
        imageUrlThree,
        setImageUrlThree,
        imageUrlFour,
        setImageUrlFour,
        endDate,
        setEndDate,
        open,
        setOpen,
        scrolling,
        setScrolling,
        signUpFields,
        setSignUpFields,
        item,
        setItem,
        filteredUser,
        setFilteredUser,
        checkSold,
        setCheckSold,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
export default CarProvider;
