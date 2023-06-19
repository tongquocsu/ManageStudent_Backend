import JWT from "jsonwebtoken";
import accountModel from "../models/accountModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.account = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.account.accountId);

    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

export const isStudent = async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.account.accountId);

    if (user.role !== "student") {
      return res.status(401).send({
        success: false,
        message: "Not student",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in student middleware",
    });
  }
};

export const isParent = async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.account.accountId);

    if (user.role !== "parent") {
      return res.status(401).send({
        success: false,
        message: "Not parent",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in parent middleware",
    });
  }
};

export const isAccountant = async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.account.accountId);

    if (user.role !== "accountant") {
      return res.status(401).send({
        success: false,
        message: "Not accountant",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in accountant middleware",
    });
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const user = await accountModel.findById(req.account.accountId);

    if (user.role !== "teacher") {
      return res.status(401).send({
        success: false,
        message: "Not teacher",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in teacher middleware",
    });
  }
};
