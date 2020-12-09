import { API_HOST } from '../../constants';
import withSession from '../../common/helpers/session';
import Axios from 'axios';

export default withSession(async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data } = await Axios.post(`${API_HOST}/auth/login`, {
      email,
      password,
    });
    const user = { isLoggedIn: true, ...data };
    req.session.set('user', user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(error.fetchResponse?.status || 500).json(error.data);
  }
});
