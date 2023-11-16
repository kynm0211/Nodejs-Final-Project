const User = require('../models/UserModel');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');
const jwt = require('jsonwebtoken');
const KEY = require('../config/key');
module.exports = (app) => {
    app.get('/api/users', async (req, res) => {
		const pageSize = 10;
		const pageNumber = parseInt(req.query.page, 10) || 1;

      	const skipAmount = (pageNumber - 1) * pageSize;
        try {
			// Count total number of users
			const totalUsers = await User.countDocuments({});
			// Calculate total number of pages
			const totalPages = Math.ceil(totalUsers / pageSize);
			
			// Calculate the skip amount based on the requested page
			const skipAmount = (pageNumber - 1) * pageSize;

            const users = await User.find({}).skip(skipAmount).limit(pageSize).lean();
			

			const data = {
				users,
				divider: totalPages,
			}
            res.json(package(0, 'Success', data));
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'An error occurred while fetching users.' });
        }
    });

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
