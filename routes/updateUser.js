const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const KEY = require('../config/key');

module.exports = (app) => {
  app.put('/api/update_user/:userId', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, KEY.SECRET_SESSION_KEY, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const { userId } = req.params;
      const userData = req.body;

      try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        res.json(updatedUser);
      } catch (error) {
        res.status(500).json({ error: 'Lỗi cập nhật dữ liệu.' });
      }
    });
  });
  app.delete('/api/delete_user/:userId', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, KEY.SECRET_SESSION_KEY, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const { userId } = req.params;

      try {
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
          return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }

        res.json({ message: 'Người dùng đã bị xóa thành công.' });
      } catch (error) {
        res.status(500).json({ error: 'Lỗi xóa người dùng.' });
      }
    });
  });
};