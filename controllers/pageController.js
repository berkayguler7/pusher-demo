const getChatPage = (req, res) => {
    res.sendFile(process.cwd() + '/views/chat.html');
};

const getLoginPage = (req, res) => {
    res.sendFile(process.cwd() + '/views/login.html');
};

const getRegisterPage = (req, res) => {
    res.sendFile(process.cwd() + '/views/register.html');
};

module.exports = { getChatPage, getLoginPage, getRegisterPage };
