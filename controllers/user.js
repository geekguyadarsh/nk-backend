const User = require("../models/user");
const Order = require("../models/Order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(404).json({
        error: "No user found in Database",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // Protecting Senstive Info
  req.profile.encryPassword = undefined;
  req.profile.salt = undefined;

  return res.status(200).json(req.profile);
};

exports.updateUser = (req, res) => {
  // Getting user id
  let userId = req.profile._id;

  //Performing update operation
  User.findByIdAndUpdate(
    userId,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Updation in User's data was not successful" });
      }
      // Protecting Senstive Info
      user.encryPassword = undefined;
      user.salt = undefined;
      return res.status(200).json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "User's Purchase List is empty",
        });
      }

      res.json(order);
    });
};

exports.pushOrderToPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.product.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.quantity,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //Store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
