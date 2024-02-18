import { useState } from "react";

import { makeDate } from "@utils/datepiacker";

import { Calendar } from ".";
import { DatePickerInput } from "./input";
import { DatePickerLayout } from "./layout";

interface Props {
  date?: number[];
}

const TODAY = makeDate(new Date());

const DatePicker = ({ date = TODAY }: Props) => {
  const [isOpened, setOpened] = useState(false);

  const [selected, setSelected] = useState(date);
  const selectDate = (date: number[]) => {
    setSelected(date);
    setOpened((b) => !b);
  };

  const toggleOpened = () => {
    setOpened((b) => !b);
  };

  return (
    <DatePickerLayout>
      <DatePickerInput date={selected} size="small" toggleOpened={toggleOpened} />
      {isOpened && <Calendar selected={selected} selectDate={selectDate} toggleOpened={toggleOpened} />}
    </DatePickerLayout>
  );
};

export default DatePicker;
