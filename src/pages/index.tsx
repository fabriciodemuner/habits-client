import React, { useEffect, useState } from "react";
import HabitsGrid from "../HabitsGrid";
import Axios from "axios";
import { API_HOST } from "../constants";
import { Habit } from "../HabitRow";
import { Layout } from "../components/Layout";

const get = Axios.get;
function App() {
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    getHabits();
  }, []);

  async function getHabits() {
    try {
      const res = await get(`${API_HOST}/habit`);
      setHabits(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      {loading ? <p>Loading...</p> : <HabitsGrid habits={habits} onChange={getHabits} />}
    </Layout>
  );
}

export default App;
