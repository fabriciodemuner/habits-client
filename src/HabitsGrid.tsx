import { Box } from '@chakra-ui/react';
import React from 'react';
import HabitRow, { Habit } from './HabitRow';

type HabitGridProps = {
  habits: Habit[];
  onChange: () => void;
};

export default function HabitsGrid(props: HabitGridProps) {
  const { habits, onChange } = props;

  return (
    <Box>
      {habits.map((habit) => (
        <HabitRow key={habit.id} habit={habit} onChange={onChange} />
      ))}
    </Box>
  );
}
