const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/banclone_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect DB Success!!');
  } catch (error) {
    console.log('Connect DB Fail!!');
  }
}

module.exports = { connect };