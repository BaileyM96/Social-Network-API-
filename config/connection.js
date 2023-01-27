const { connect, connection } = require('mongoose');

//Check back to later
connect('mongodb://localhost:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
