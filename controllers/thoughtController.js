const { User, Thought } = require('../models');

// Export the modules
module.exports = {
    getThought(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Get single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('__v')
        .populate('thoughts')
        .populate('friends')
        .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No such thought with that ID'})
        : res.json(thought)
        )
    }
}