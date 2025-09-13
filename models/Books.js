const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String,
        default: "General"
    },
    pages: { type: Number },
    publishedYear: { type: Number }
}
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
