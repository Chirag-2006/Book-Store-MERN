import express from "express";
import { Book } from "../models/BookModels.model.js";

const router = express.Router();


// route for save a new book
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res
                .status(400)
                .send("send all the required fields title, author and publishYear");
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = new Book(newBook);
        await book.save(); // save the book to database
        return res.status(201).send(book);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// route for get all books from database
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Books not found");
    }
});

// route for get a book from database by id
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send(book);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("no book found");
    }
});

// route for update a book by id
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("send all the required fields title, author and publishYear");
        }
        const result = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


// route for delete a book by id
router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send("Book deleted successfully");
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
}
);

export default router;