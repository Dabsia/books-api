import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is required"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Book Author is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Published Year is required"],
    trim: true,
    max: [
      new Date().getFullYear(),
      "Year cacnot be greater than the current year",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
