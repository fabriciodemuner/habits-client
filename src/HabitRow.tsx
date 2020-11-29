import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";
import EditHabit from "./EditHabit";

const put = Axios.put;

export type Row = {
  id: number;
  name: string;
  description: string;
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
    <div>
      <p>
        Name: {row.name}. Streak: {row.streak}.
      </p>
      <button onClick={() => setEdit(true)}>Edit Habit</button>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
      <button onClick={toggleDate}>Toggle Date</button>
    </div>
  );
}