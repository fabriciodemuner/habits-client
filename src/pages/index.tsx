import React, { useEffect, useState } from 'react';
import HabitsGrid from '../HabitsGrid';
import Axios from 'axios';
import { Habit } from '../HabitRow';
import { Layout } from '../components/Layout';
import useUser from '../common/helpers/useUser';
import { BASE_URL, ENDPOINTS } from './api/endpoints';

function App() {
  const { user, mutateUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    getHabits();
  }, [user]);

  async function getHabits() {
    if (user) {
      if (user.isLoggedIn) {
        try {
          const res = await Axios.get(`${BASE_URL}${ENDPOINTS.HABITS.LIST}`, { headers: { Authorization: `Bearer ${user.accessToken}` } });
          setHabits(res.data);
        } catch (err) {
          if (err.response.status === 401 && user.refreshToken) {
            try {
              await mutateUser(Axios.post('/api/refresh-token', { refreshToken: user.refreshToken }));
            } catch (err) {
              console.error(err);
            }
          }
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
