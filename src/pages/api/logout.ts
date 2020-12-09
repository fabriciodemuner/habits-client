import withSession from '../../common/helpers/session';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
