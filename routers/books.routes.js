import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/books.js";

const bookRouter = express.Router();

bookRouter.post("/books", createBook);
bookRouter.get("/books", getAllBooks);
bookRouter.get("/books/:id", getBookById);
bookRouter.patch("/books/:id", updateBook);
bookRouter.delete("/books/:id", deleteBook);

export default bookRouter;
