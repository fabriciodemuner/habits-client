import React, { useEffect, useState } from "react";
import HabitsGrid from "../HabitsGrid";
import Axios from "axios";
import { API_HOST } from "../constants";
import { Row } from "../HabitRow";
import { Layout } from "../components/Layout";

const get = Axios.get;
function App() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);

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

  return (
    <Layout>{loading ? <p>Loading...</p> : <HabitsGrid rows={rows} onChange={getHabits} />}</Layout>
  );
}

export default App;
