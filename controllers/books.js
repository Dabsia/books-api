import Book from "../models/book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book with this title already exists",
      });
    }

    // Create new book
    const newBook = await Book.create({
      title,
      author,
      year,
    });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create book",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch books",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch book",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      year,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update book",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete book",
    });
  }
};
