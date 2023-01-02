const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Account = new Scheme(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    level: { type: Number, default: 1 },
    wallet: { type: String, default: 0 },
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
