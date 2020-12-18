import withSession from '../../common/helpers/session';
import Axios from 'axios';
import { API_HOST } from '../../constants';

export default withSession(async (req, res) => {
  const { refreshToken } = req.body;
  let user = req.session.get('user');
  console.log('api-refreshToken: ', refreshToken);
  try {
    const { data } = await Axios.post(`${API_HOST}/auth/refresh-token`, {
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
