import { CheckIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { API_HOST } from "./constants";
import { Habit } from "./HabitRow";

const put = Axios.put;

type WeekViewProps = {
  habit: Habit;
  onChange: () => void;
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
  const { habit, onChange } = props;
  if (!habit.days) return <p>erro</p>;

  const week: Week = [];
  for (let idx = 0; idx < 7; idx++) {
    const day = newUTCDate(idx);
    const done = habit.days.some((e) => e === day);
    week[idx] = { key: idx, day, done };
  }

  async function handleClick(day: string) {
    try {
      await put(`${API_HOST}/habit/${habit.id}/days`, { date: day });
      onChange();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Flex alignItems="center">
      {week.map((d) => (
        <Button
          colorScheme={d.done ? "green" : undefined}
          border={"1px"}
          onClick={() => handleClick(d.day)}
        >
          <Flex direction="column">
            <Text fontSize="sm">{d.day.split("-").slice(1, 3).reverse().join("/")}</Text>
            <Box>{d.done ? <CheckIcon /> : <TimeIcon />}</Box>
          </Flex>
        </Button>
      ))}
    </Flex>
  );
}
