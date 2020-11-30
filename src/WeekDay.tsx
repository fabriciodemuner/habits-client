import React from "react";
import { Day } from "./WeekView";
import { Text } from "@chakra-ui/react";

type WeekDayProps = {
  day: Day;
};

export default function WeekDay(props: WeekDayProps) {
  const { day } = props;

  return (
    <Text fontSize="sm">
      {day.day}: {day.done ? "Done " : "nawh "}
    </Text>
  );
}
