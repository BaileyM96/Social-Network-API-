const { User, Thought } = require('../models');

//export the modules 
module.exports = {
    // Get all users
    getUser(req, res) {
        User.find()
        .then((User) => res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId })
        .select('__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
            !user
            ? res.status(404).json({message: 'No such user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a User
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // Update a single user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No such user with that ID' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user 
        ? res.status(404).json({ message: 'No such user with this ID' })
        : Thought.deleteMany({ _id: { $in: user.thiughts } })
        )
        .then(() => res.json({ message: 'The user and thought has been deleted' }))
        .catch((err) => res.status(500).json(err));
    },
    // Add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with such ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete the friend 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};