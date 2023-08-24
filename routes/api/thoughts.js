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


// ('/') route to get all thoughts,  add a new thought and push thought's _id to associated user's thoughts array
router.route('/')
  .get(getThoughts)
  .post(addThought)

// ('/:id') route to get single thought by _id, update thought by _id, delete thought by _id
router.route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// ('/:thoughtId/reactions') route to create a reaction stored in thoughts array of reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// (':thoughtId/reactions/:reactionId') route to delete a reaction 
router.route('/:thoughtId/reactions/:reactionId')
  .put(deleteReaction);

  module.exports = router;