const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');


// ('/') route to get all thoughts, get single thought by _id, add a new thought and push thought's _id to associated user's thoughts array, update thought by _id, delete thought by _id
router.route('/')
  .get(getThoughts)
  .get(getSingleThought)
  .post(addThought)
  .put(updateThought)
  .delete(deleteThought);

// ('/:thoughtId/reactions') route to create a reaction stored in thoughts array of reactions, delete reaction and remove by reactionId value
router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

  module.exports = router;