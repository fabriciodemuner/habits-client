import { API_HOST } from '../../constants';
import fetchJson from '../../common/helpers/fetchJson';
import withSession from '../../common/helpers/session';

export default withSession(async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await fetchJson(`${API_HOST}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const user = { isLoggedIn: true, ...response };
    req.session.set('user', user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
