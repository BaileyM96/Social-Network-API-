const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
    //TODO Create controllers so we can require them
} = require();

// /api/users GET all & POST
router.route('/').get(getUser).post(createUser);

// /api/users/:usersId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/userId/friend/friendsId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;