const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// ('/') route to get a new user, get single user by _id with populated thought and friend data, post new user, update user by _id, delete user and associated thoughts by _id
router.route('/')
  .get(getUsers)
  .get(getSingleUser)
  .post(addUser)
  .put(updateUser)
  .delete(deleteUser);

// ('/:userId/friends/:friendId') route to add a new friend to user, delete friend from user
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;

