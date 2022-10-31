const express = require("express");
const router = express.Router();
const books = require("./booksController");

router.get("/books", books.index); // Get all books
router.post("/books/create", books.create); // Create new book
router.get("/books/:id", books.show); // Get by specific ID
router.delete("/books/delete/:id", books.delete); // Delete by specific ID
router.put("/books/update/:id", books.update); // Update book info by specific ID
router.get("/books/searchByTitle/:title", books.searchByTitle); // Search by title keyword
router.delete("/books/deleteall", books.deleteAll); //

module.exports = router;
