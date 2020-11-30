import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";
import EditHabit from "./EditHabit";
import WeekView from "./WeekView";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

const put = Axios.put;

export type Row = {
  id: number;
  name: string;
  description: string;
  days: string[];
  streak: number;
  createdAt: Date;
  updatedAt: Date;
};

type HabitRowProps = {
  row: Row;
  onChange: () => void;
};

export default function HabitRow(props: HabitRowProps) {
  const { row, onChange } = props;
  const today = JSON.stringify(new Date()).slice(1, 11);
  const [date, setDate] = useState(today);
  const [edit, setEdit] = useState(false);

  async function toggleDate() {
    try {
      await put(`${API_HOST}/habit/${row.id}/days`, { date });
      setDate(today);
      onChange();
    } catch (err) {
      console.error(err);
    }
  }

  if (edit) {
    return <EditHabit row={row} onChange={onChange} setEdit={setEdit} />;
  }

  return (
    <Box mt="4" mx="2">
      <Heading size="lg">{row.name}</Heading>
      <Text my="2">Streak: {row.streak}</Text>
      <Flex alignItems="center">
        <WeekView days={row.days} />
        <Box>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}></Input>
          <Button onClick={toggleDate}>Toggle Date</Button>
          <Button m="2" onClick={() => setEdit(true)}>
            Edit Habit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
