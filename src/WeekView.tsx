import React from "react";
import { Row } from "./HabitRow";

type WeekViewProps = {
  days: Row["days"];
};

function newUTCDate(idx: number): string {
  const oneDay = 1000 * 60 * 60 * 24;
  const date = new Date(new Date().valueOf() - idx * oneDay);
  return JSON.stringify(date).slice(1, 11);
}

export default function WeekView(props: WeekViewProps) {
  const { days } = props;
  if (!days) return <p>erro</p>;

  const week: { key: number; day: string; done: boolean }[] = [];
  for (let idx = 0; idx < 7; idx++) {
    const day = newUTCDate(idx);
    const done = days.some((e) => e === day);
    week[idx] = { key: idx, day, done };
  }

  return (
    <div>
      {week.map((d) => (
        <p>
          {d.day}: {d.done ? "Done " : "nah "}
        </p>
      ))}
    </div>
  );
}
