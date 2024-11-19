import express, {urlencoded} from 'express';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, isAvailable: true },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, isAvailable: true },
    { id: 3, title: 'Moby Dick', author: 'Herman Melville', year: 1851, isAvailable: true }
];

// Add a new book
app.post('/books', (req,res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        isAvailable: req.body.isAvailable
    }
    books.push(book);
    res.send(book);
})

// List all available books
app.get('/books/available', (req, res) => {
    res.send(books.filter(book => book.isAvailable === true));
})

// Borrow a book by title
app.post('/books/borrow', (req, res) => {
    let borrow = req.body.title;
    let index = books.findIndex(book => book.title == borrow);
    if (books[index] != undefined && books[index].isAvailable == true) {
        books[index].isAvailable = false;
        res.send(books[index]);
    } else {
        res.status(404).send('Book not available or already borrowed');
    }
})

// Return a borrowed book
app.post('/books/return', (req, res) => {
    let putBack = req.body.title;
    let index = books.findIndex(book => book.title === putBack);
    if (books[index] != undefined && books[index].isAvailable === false) {
        books[index].isAvailable = true;
        res.send(books[index]);
    } else {
        res.status(404).send('Book not found or not borrowed');
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));