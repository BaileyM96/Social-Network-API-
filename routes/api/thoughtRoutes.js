const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
    //Need controllers so I can import them to this page
} = require('../../controllers/thoughtController');
// /api/getAllThoughts and get thought and create a thought
router.route('/').get(getThought).post(createThought);

// /api/update the thought by :id delete thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
