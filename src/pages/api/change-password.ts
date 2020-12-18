import withSession from '../../common/helpers/session';
import Axios from 'axios';
import { BASE_URL, ENDPOINTS } from './endpoints';

export default withSession(async (req, res) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}${ENDPOINTS.AUTH.CHANGE_PASSWORD}`, req.body, { headers: req.headers });
    res.json(data);
  } catch (error) {
    res.status(error.fetchResponse?.status || 500).json(error.data);
  }
});
