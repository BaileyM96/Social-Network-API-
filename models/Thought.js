const { Schema, model } = require('mongoose');
const moment = require('moment');

// NOT A MODEL; used for reaction field subdocument schema in Thought model
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
           type: String,
           required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


//This is like a post
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        
        createdAt: {
                type: Date,
                default: Date.now,
                get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
         },
         username: {
            type: String,
            required: true,
         },
         //Replies
         reactions: [reactionSchema],
    },
    {
        //Virtual Need to retrieve the length of thoughts reactions array
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`;
    });

    const Thought = model('Thought', thoughtSchema);

    module.exports = Thought;