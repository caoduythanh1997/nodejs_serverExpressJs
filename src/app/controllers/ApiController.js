const { Accounts, Notice } = require('./modules/Account');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const e = require('express');

class ApiController {
  //[GET] /api/v1/notice
  noticeApi(req, res, next) {
    Notice.findOne({})
      .then((notice) => {
        res.json({ notice: mongooseToObject(notice) });
      })
      .catch(next);
  }
  //[GET] /api/v1/notice
  fullAccountApi(req, res, next) {
    Accounts.find({})
      .then((data) => {
        res.json({ data: multipleMongooseToObject(data) });
      })
      .catch(next);
  }
  //[GET] /api/v1/login
  login(req, res, next) {
    if (req.data.message == 'Check Token OK') {
      Accounts.findOne({
        username: req.body.username,
        password: req.body.password,
      })
        .then((data) => {
          res.json({ mes: 'login success', accessToken: data.accessToken });
        })
        .catch((error) => {
          res.json({ mes: 'login fail', error });
        });
    } else {
      res.json({ mes: 'TokenFail' });
    }
  }
  //[PUT] /api/v1/login
  UpdateToken(req, res, next) {
    if (req.data != undefined) {
      try {
        const data = jwt.verify(req.data.accessToken, 'nowyouseme');
        const data2 = {
          accessToken: req.data.accessToken,
        };
        Accounts.updateOne({ _id: data._id }, data2)
          .then((data) => {
            req.data = {
              message: 'Check Token OK',
            };
            next();
          })
          .catch((error) => {
            req.data = {
              message: 'Check Token Fail',
            };
            next();
          });
      } catch (error) {
        res.json(error);
        next();
      }
    } else {
      req.data = {
        message: 'Check Token OK',
      };
      next();
    }
  }
  UpdateMoneySuccess(req,res,next){
    if (req.data != undefined) {
      try {
        const data = jwt.verify(req.data.accessToken, 'nowyouseme');
        const data2 = {
          accessToken: req.data.accessToken,
        };
        Accounts.updateOne({ _id: data._id }, data2)
          .then((data) => {
            req.data = {
              message: 'Check Token OK',
            };
            next();
          })
          .catch((error) => {
            req.data = {
              message: 'Check Token Fail',
            };
            next();
          });
      } catch (error) {
        res.json(error);
        next();
      }
    } else {
      req.data = {
        message: 'Check Token OK',
      };
      next();
    }
  }
  UpdateMoney(req,res,next){
    if(req.body.wallet != undefined){
      const data2 = {
        _id: req.data._id,
        firstName: req.data.firstName,
        lastName: req.data.lastName,
        username: req.data.username,
        level: req.data.level,
        wallet : req.body.wallet,
        email : req.data.email,
        phone : req.data.phone,
      };
      const token = jwt.sign(data2, 'nowyouseme');
      const dt = {
        wallet : req.body.wallet,
        accessToken: token,
      }
      Accounts.updateMany({_id : req.body._id},dt).then(dt =>{
        const data = {
          message: 'Success',
          accessToken : token,
        };
        res.json(data)
      }).catch((error) =>{
        const data = {
          message: 'Fail',
          eror : error
        };
        res.json(data)
      })
    }
    else{
      res.json('error')
    }
  }
  checkAccountByID(req,res,next){
    Accounts.findOne({
      _id : req.body._id,
    }).then((data) =>{
      if(data != null){
        req.data = data;
        next();
      }
      else{
        res.json({ mes: 'Tài khoản không tồn tại' });
      }
    }).catch((error) => res.json('error =>' + error));
  }
  checkAccount(req, res, next) {
    Accounts.findOne({
      username: req.body.username,
      password: req.body.password,
    })
      .then((data) => {
        if (data != null) {
            const data2 = {
              _id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              level: data.level,
              wallet : data.wallet,
              email : data.email,
              phone : data.phone,
            };
            const token = jwt.sign(data2, 'nowyouseme');
            const tk = {
              accessToken: token,
            };
            req.data = tk;
            next();
        } else {
          res.json({ mes: 'Tài khoản không tồn tại' });
        }
      })
      .catch((error) => res.json('error =>' + error));
  }
  checkValueRegister(req,res,next){
    const formData = req.body;
    try {
      if(formData.username.includes('admin') || formData.username.includes('Admin')){
        const arr = {
          mes: 'Không Được Đặt Username Là Admin!',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.firstName === undefined){
        const arr = {
          mes: 'Vui lòng điền họ',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.lastName === undefined){
        const arr = {
          mes: 'Vui lòng điền tên',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.username === undefined){
        const arr = {
          mes: 'Vui lòng điền tài khoản',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.password === undefined){
        const arr = {
          mes: 'Vui lòng điền mật khẩu',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.email === undefined){
        const arr = {
          mes: 'Vui lòng điền email',
          code: '300',
        };
        return res.json(arr);
      }
      else if(formData.phone === undefined){
        const arr = {
          mes: 'Vui lòng điền số điện thoại',
          code: '300',
        };
        return res.json(arr);
      }
      else{
        next();
      }
    } catch (error) {
      const arr = {
        mes: 'Giá trị nhập vào lỗi',
        code: '500',
      };
       res.json(arr);
    }
    
  }
  checkAccountIsOnline(req,res,next){
    const formData = req.body;
    const subData = {
      username : formData.username,
      password : formData.password
    }
    Accounts.findOne(subData).then(data =>{
      if(data == null){
        next();
      }
      else{
        const arr = {
          mes: 'Tài khoản đã có người sử dụng!',
          code: '300',
        };
        return res.json(arr);
      }
    }).catch(err =>{
      const arr = {
        mes: 'Lỗi Nhập Tài Khoản',
        code: '300',
        result : err
      };
      return res.json(arr);
    });
  }
  checkEmailIsOnline(req,res,next){
    const formData = req.body;
    const subData = {
      email : formData.email,
    }
    Accounts.findOne(subData).then(data =>{
      if(data == null){
        next();
      }
      else{
        const arr = {
          mes: 'Email Này Đã Được Sử Dụng',
          code: '300',
        };
        return res.json(arr);
      }
      
    }).catch(err =>{
      const arr = {
        mes: 'Lỗi Nhập Email',
        code: '300',
        result : err
      };
      return res.json(arr);
    });
  }
  checkPhoneIsOnline(req,res,next){
    const formData = req.body;
    const subData = {
      phone : formData.phone,
    }
    Accounts.findOne(subData).then(data =>{
      if(data == null){
        next();
      }
      else{
        const arr = {
          mes: 'Số Điện Thoại Này Đã Được Sử Dụng',
          code: '300',
        };
        return res.json(arr);
      }
      
    }).catch(err =>{
      const arr = {
        mes: 'Lỗi Nhập Phone',
        code: '300',
        result : err
      };
      return res.json(arr);
    });
  }
  //[POST] /api/v1/register_account
  Register(req, res, next) {
    const formData = req.body;
    const dataAccount = new Accounts(formData);
    dataAccount.save()
    .then(() =>{
      const data = {
        mes: 'Register Success',
        code: '200',
        data: {
          account : formData,
        },
      };
      res.json(data);
    })
    .catch(error =>{
      const data = {
        mes: 'Register Fail',
        code: '202',
        data: {
          account: formData,
        },
      };
      res.json(data);
    })
  }
  //[DELETE] /api/v1/delete_account
  delete_account(req, res, next) {
    const formData = req.body;
  }
  getAccountById(req,res,next){
    Accounts.findById(req.body._id).then(data =>{
      res.json(data)
    }).catch(error => res.json(error));
  }
}

module.exports = new ApiController();
