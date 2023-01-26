const { connect, connection } = require('mongoose');

//Check back to later
connect('mongodb://localhost/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
