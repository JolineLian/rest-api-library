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

app.get('/books/available', (req, res) => {
    res.send(books.filter(book => book.isAvailable===true));
})

app.post('/books/borrow', (req, res) => {
    let borrow = req.body.title;
    let index = books.findIndex(book => book.title == borrow);
    if (books[index]!=undefined && books[index].isAvailable == true) {
        books[index].isAvailable = false;
        res.send(books[index]);
    } else {
        res.status(404).send('book not found');
    }
})

app.post('/books/return', (req, res) => {
    let putBack = req.body.title;
    let index = books.findIndex(book => book.title == putBack);
    if (books[index]!=undefined && books[index].isAvailable == false) {
        books[index].isAvailable = true;
        res.send(books[index]);
    } else {
        res.status(404).send('book not found');
    }
})

app.listen(PORT, () => console.log(`Server startred on port ${PORT}`));