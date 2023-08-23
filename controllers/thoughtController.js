const { Thought, User } = require('../models');

const getThoughts = async function (req, res) {
  try {
    const thoughts = await Thought.find().select('-__v');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleThought = async function (req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.body.id })
      .populate('user')
      .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found by that ID'});
      };
      res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addThought = async function (req, res) {
  try {
    const newThought = await Thought.create(req.body);
    const updateUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: {thoughts: newThought._id}},
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: 'Thought created but no user found with that ID '});
    }
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateThought = async function (req, res) {
  try {
    const updatedThoughtData = await Thought.findOneAndUpdate(
      { _id: req.body.id },
      { $set: req.body },
      { runValidators: true, new: true}
    );

    if (!updatedThoughtData) {
      return res.status(404).json({message: 'No thought found by that ID'});
    };

    res.json(updatedThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteThought = async function (req, res) {
  try {
    const deletedThoughtData = await Thought.findOneAndRemove({ _id: req.body.id });
    const userData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { thought: deletedThoughtData._id }},
      { new: true }
    );

    if (!deletedThoughtData) {
      return res.status(404).json({ message: 'No thought found by that ID '});
    };
    if (!userData) {
      return res.status(404).json({ message: 'Thought deleted but no user found by that ID'});
    };
    res.json('Thought successfully deleted'); 
  } catch (err) {
    res.status(500).json(err);
  }
};

const addReaction = async function (req, res) {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $addToSet: {reactions: req.body}},
      { runValidators: true, new: true }
    );
    if (!thoughtData) {
      return res.status(404).json({ message: 'No thought found by that ID' });
    };

    res.json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReaction = async function (req, res) {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      { $pull: {reactions: req.body.reactionId}},
      { runValidators: true, new: true }
    );
    if (!thoughtData) {
      return res.status(404).json({ message: 'No thought found by that ID' });
    };

    res.json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
}