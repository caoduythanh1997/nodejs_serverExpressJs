const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://caoduythanh:s9mPhNQGUVJZIwMY@cluster0.gkefgie.mongodb.net/webbanclone?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect DB Success!!');
  } catch (error) {
    console.log('Connect DB Fail!!');
  }
}

module.exports = { connect };
