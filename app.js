require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./setup/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

sequelize.sync().then(() => {
  console.log('SQLite database synced');
});

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/user', userRoutes);
app.use('/message', messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
