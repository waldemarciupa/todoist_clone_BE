const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;
const router = require('./routes/routes');

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

try {
  mongoose.connect(process.env.MONGO_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Successfully connected to DB');
} catch (error) {
  console.log(`Error while connecting DB!!!: ${error}`);
}

app.use(router);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
