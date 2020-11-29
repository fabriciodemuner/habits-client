import React from "react";
import HabitRow, { Row } from "./HabitRow";

type HabitGridProps = {
  rows: Row[];
  onChange: () => void;
};

export default function HabitsGrid(props: HabitGridProps) {
  const { rows, onChange } = props;

  return (
    <div>
      {rows.map((row) => (
        <HabitRow key={row.id} row={row} onChange={onChange} />
      ))}
    </div>
  );
}
