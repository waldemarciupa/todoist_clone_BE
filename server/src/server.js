const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/routes');

app.use(cors());
app.use(express.json());

require('dotenv').config();

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
