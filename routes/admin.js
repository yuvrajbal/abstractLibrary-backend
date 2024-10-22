const { Router } = require("express");
const { adminMiddleware } = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const { summaryModel } = require("../db");
const adminRouter = Router();
require("dotenv").config();

// admin login
adminRouter.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // check credentials from db then send token which will be stored in localstorage on client side
    // let token;
    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: username,
      },
      process.env.JWT_ADMIN_PASSWORD
    );

    return res.status(200).json({
      message: "Logged in succesfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while signing in",
      error: err,
    });
  }
});

// create a new summary
adminRouter.post("/createSummary", adminMiddleware, async function (req, res) {
  const { title, summaryUrl, author, imageUrl } = req.body;

  try {
    const book = await summaryModel.create({
      title: title,
      summaryUrl: summaryUrl,
      author: author,
      imageUrl: imageUrl,
    });
    // logic for creating the summary doc
    return res.status(200).json({
      message: "Created summary document successfully",
      bookId: book._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating book model",
      error: err,
    });
  }
});

// edit a summary

adminRouter.put(
  "/createSummary/:bookId",
  adminMiddleware,
  async function (req, res) {
    const bookId = req.params.bookId;
    const { title, summaryUrl, author, imageUrl } = req.body;
    try {
      // logic for updating the summary doc
      const book = await summaryModel.updateOne(
        {
          _id: bookId,
        },
        {
          title: title,
          summaryUrl: summaryUrl,
          imageUrl: imageUrl,
          author: author,
        }
      );
      return res.status(200).json({
        message: "updated summary document successfully",
        bookId: book._id,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error while updating summary",
        error: err,
      });
    }
  }
);

module.exports = {
  adminRouter: adminRouter,
};
