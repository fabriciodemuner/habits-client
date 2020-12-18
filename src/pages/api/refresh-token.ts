import withSession from '../../common/helpers/session';
import Axios from 'axios';
import { BASE_URL, ENDPOINTS } from './endpoints';

export default withSession(async (req, res) => {
  const { refreshToken } = req.body;
  let user = req.session.get('user');
  console.log('api-refreshToken: ', refreshToken);
  try {
    const { data } = await Axios.post(`${BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
      refreshToken,
    });
    user = { ...user, ...data, isLoggedIn: true };
    req.session.set('user', user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
});
