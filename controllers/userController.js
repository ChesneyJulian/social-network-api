const { User, Thought } = require('../models');

const getUsers = async function (req, res) {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    res.status(500).json(err );
  }
};

const getSingleUser = async function (req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id})
      // .populate('thought')
      // .populate('user')
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' })
      }

      res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addUser = async function (req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async function (req, res) {
  try {
    const updatedUserData = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updatedUserData) {
     return res.status(404).json({ message: 'No user found with that ID' });
    };

    res.json(updatedUserData);
  } catch (err) {
    res.status(500).json(err);
  };
}

const deleteUser = async function (req, res) {
  try {
    const deletedUserData = await User.findOneAndRemove({ _id: req.params.id })

    if(!deletedUserData) {
      return res.status(404).json({ message: 'No user found with that ID' })
    };
    // ADD FUNCTIONALITY TO REMOVE ASSOCIATED THOUGHTS
    // const thoughts = await Thought.find(
    //   {}
    // )
    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  };
};

const addFriend = async function (req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId }},
      { runValidators: true, new: true}
    ).populate('user');

    if (!userData) {
      return res.status(404).json({ message: 'No user found with that ID' });
    };

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  };
};

const deleteFriend = async function (req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId }},
      { runValidators: true, new: true}
    ).populate('user');

    if (!userData) {
      return res.status(404).json({ message: 'No user found with that ID' });
    };
  } catch (err) {
    res.status(500).json(err);
  };
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
}