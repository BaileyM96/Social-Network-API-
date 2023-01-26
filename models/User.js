const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Enter a valid email address!',
            ],
        },
        // Use populate so I can reference thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Tyoes.ObjectId,
                ref: 'User'
            },
        ],
    },
    //virtuals created with JSON response
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
 .virtual('friends')
    .get(function () {
        return `${this.friends.length}`;
    });

    const User = model('User', userSchema);

    module.exports = User;
    

