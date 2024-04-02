const pusher = require('../setup/pusher');

const sendMessage = async (req, res) => {
    console.log("req.user", req.user);
    const data = { user: req.user.name, message: req.body.message };
    pusher.trigger('chat', 'message', data);
    res.json(data);
};

module.exports = { sendMessage };