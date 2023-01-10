const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Account = new Scheme(
  {
    firstName : {type:String,require : true},
    lastName : {type:String,require : true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    accessToken: { type: String, default: null },
    level: { type: Number, default: 1 },
    wallet: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);
const notice = new Scheme(
  {
    title_notice: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);
let Accounts = mongoose.model('Account', Account);
let Notice = mongoose.model('Notice', notice);
module.exports = { Accounts, Notice };
