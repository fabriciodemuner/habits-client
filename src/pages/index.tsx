import React, { useEffect, useState } from "react";
import AddHabit from "../AddHabit";
import HabitsGrid from "../HabitsGrid";
import Axios from "axios";
import { API_HOST } from "../constants";
import { Row } from "../HabitRow";
import { Layout } from "../components/Layout";
import { Button, Heading } from "@chakra-ui/react";

const get = Axios.get;
function App() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getHabits();
  }, []);

  async function getHabits() {
    try {
      const res = await get(`${API_HOST}/habit`);
      setRows(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  const gridDiv = loading ? <p>Loading...</p> : <HabitsGrid rows={rows} onChange={getHabits} />;
  const addDiv = add ? (
    <AddHabit onChange={getHabits} setAdd={setAdd} />
  ) : (
    <Button onClick={() => setAdd(true)}>Add Habit</Button>
  );

  return (
    <Layout>
      {gridDiv}
      <br />
      {addDiv}
    </Layout>
  );
}

export default App;
