require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./setup/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());

sequelize.sync().then(() => {
  console.log('SQLite database synced');
});

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const pageRoutes = require('./routes/pageRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.get('/', authMiddleware, (req, res) => {
  res.redirect('/page/login');
});

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/page', pageRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
