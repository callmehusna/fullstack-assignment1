const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/books',(req, res) => {
    const books = JSON.parse(fs.readFileSync('books.json', 'utf-8'))
    res.send(books)
})
app.get('/books/:id',(req, res) => {
    const books = JSON.parse(fs.readFileSync('books.json', 'utf-8'))
    let result = books.filter((element) => element.id == req.params.id)
    res.send(result[0])
})
app.get('/ejs/books', (req, res) => {
    const books = JSON.parse(fs.readFileSync('books.json', 'utf-8'))
    res.render('bookList', {books})
}) 
const server = app.listen(PORT)
process.on("SIGTERM", graceful(server))
process.on("SIGINT", graceful(server))

function graceful(server) {
    return () => {
        server.close()
        fs.closeSync()
        console.log("Server closed");
    }
}