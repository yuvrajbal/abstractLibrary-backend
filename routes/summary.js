const { summaryModel } = require("../db");

async function getAllSummaries(req, res) {
  try {
    // fetch all summaries from db
    const books = await summaryModel.find();

    return res.status(200).json({
      message: "fetched all summaries",
      books: books,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error while fetching book summaries",
    });
  }
}

async function getSummary(req, res) {
  const bookId = req.params.bookId;
  try {
    // fetch a summaries from db
    const book = await summaryModel.findOne({
      _id: bookId,
    });
    return res.status(200).json({
      message: "fetched a summary",
      book: book,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error while fetching summary",
    });
  }
}

module.exports = {
  getAllSummaries,
  getSummary,
};
