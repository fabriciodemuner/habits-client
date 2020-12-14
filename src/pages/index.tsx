import React, { useEffect, useState } from 'react';
import HabitsGrid from '../HabitsGrid';
import Axios from 'axios';
import { API_HOST } from '../constants';
import { Habit } from '../HabitRow';
import { Layout } from '../components/Layout';
import useUser from '../common/helpers/useUser';

function App() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    getHabits();
  }, [user]);

  async function getHabits() {
    if (user) {
      if (user.isLoggedIn) {
        try {
          const res = await Axios.get(`${API_HOST}/habit`, { headers: { Authorization: `Bearer ${user.accessToken}` } });
          setHabits(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    }
  }

  return (
    <Layout>
      {loading ? <p>Loading...</p> : user!.isLoggedIn ? <HabitsGrid habits={habits} onChange={getHabits} /> : <p>Log in to see your Habits</p>}
    </Layout>
  );
}

export default App;
