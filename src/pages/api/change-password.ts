import { API_HOST } from '../../constants';
import withSession from '../../common/helpers/session';
import Axios from 'axios';

export default withSession(async (req, res) => {
  try {
    const { data } = await Axios.post(`${API_HOST}/auth/change-password`, req.body, { headers: req.headers });
    res.json(data);
  } catch (error) {
    res.status(error.fetchResponse?.status || 500).json(error.data);
  }
});
