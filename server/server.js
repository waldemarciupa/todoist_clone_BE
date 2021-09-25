const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from homepage' });
});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
