import { Box } from "@chakra-ui/react";
import React from "react";
import { Habit } from "./HabitRow";
import WeekDay from "./WeekDay";

type WeekViewProps = {
  days: Habit["days"];
};

type Week = Day[];

export type Day = {
  key: number;
  day: string;
  done: boolean;
};

function newUTCDate(idx: number): string {
  const oneDay = 1000 * 60 * 60 * 24;
  const date = new Date(new Date().valueOf() - idx * oneDay);
  return JSON.stringify(date).slice(1, 11);
}

export default function WeekView(props: WeekViewProps) {
  const { days } = props;
  if (!days) return <p>erro</p>;

  const week: Week = [];
  for (let idx = 0; idx < 7; idx++) {
    const day = newUTCDate(idx);
    const done = days.some((e) => e === day);
    week[idx] = { key: idx, day, done };
  }

  return (
    <Box w="20em">
      {week.map((d) => (
        <WeekDay day={d} />
      ))}
    </Box>
  );
}
