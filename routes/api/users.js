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

// ('/') route to get a new user, post new user
router.route('/')
  .get(getUsers)
  .post(addUser) 

//('/:id') route get single user by _id with populated thought and friend data, update user by _id, delete user and associated thoughts by _id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// ('/:userId/friends/:friendId') route to add a new friend to user, delete friend from user
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;

