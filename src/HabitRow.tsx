import React, { useEffect, useState } from 'react';
import EditHabit from './EditHabit';
import WeekView from './WeekView';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

export type Habit = {
  id: number;
  name: string;
  description: string;
  days: string[];
  createdAt: Date;
  updatedAt: Date;
};

type HabitRowProps = {
  habit: Habit;
  onChange: () => void;
};

export default function HabitRow(props: HabitRowProps) {
  const { habit, onChange } = props;
  const [edit, setEdit] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(
      habit.days.reduce((streak, _curr, idx, days) => {
        const oneDay = 1000 * 60 * 60 * 24;
        const day = JSON.stringify(new Date(new Date().valueOf() - streak * oneDay)).slice(1, 11);
        if (day === days[idx]) streak++;
        return streak;
      }, 0),
    );
  }, [habit]);

  if (edit) {
    return <EditHabit habit={habit} onChange={onChange} setEdit={setEdit} />;
  }

  return (
    <Flex mt="4" mx="2" alignItems="start">
      <Box minW="40%">
        <Flex alignItems="center">
          <Heading size="sm">{habit.name}</Heading>
          <IconButton ml="2" mr="auto" onClick={() => setEdit(true)} size="xs" aria-label="Edit habit" icon={<EditIcon />} />
        </Flex>
        <Text my="2" fontSize="xs">
          Streak: {streak}
        </Text>
      </Box>
      <WeekView habit={habit} onChange={onChange} />
    </Flex>
  );
}
