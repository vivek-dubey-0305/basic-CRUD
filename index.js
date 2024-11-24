const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


port = process.env.PORT
app.listen(port, () => {
    console.log("Listening on port", port)
})

let posts = [
    {
        id: uuidv4(),
        username: "Alice Johnson",
        content: "Exploring the wonders of AI and how it’s transforming our daily lives! #TechLife"
    },
    {
        id: uuidv4(),
        username: "John Smith",
        content: "Just completed a challenging coding project! Feels great to see it all come together. #DevLife"
    },
    {
        id: uuidv4(),
        username: "Sarah Williams",
        content: "Loving the serene view at the beach today. Taking time to recharge. 🌊 #NatureLover"
    },
];


// ROUTE : ROOT PAGE
app.get("/", (req, res) => {
    res.render("root.ejs", { posts })
})

// Route : HOME PAGE
app.get("/home", (req, res) => {
    res.render("index.ejs", { posts })
})


// Route : TO ADD A NEW POST
app.get("/home/post", (req, res) => {
    res.render("post.ejs")
})


// Route : AFTER SUCCESSFULLY ADDING A NEW POST, REDIRECT TO HOMEPAGE
app.post("/home", (req, res) => {
    let id = uuidv4()
    let { username, content } = req.body
    // console.log(req.body)
    posts.push({ id, username, content })
    res.redirect("/home")
})



// Route : VIEW PAGE
app.get("/home/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id);
    // console.log(post)
    res.render("view.ejs", { post })
})



// Route : VIEW PAGE PATCH
app.patch("/home/:id", (req, res) => {
    let { id } = req.params
    let newContent = req.body.content
    console.log(newContent)
    let post = posts.find((p) => id === p.id);
    post.content = newContent
    console.log(post)
    res.redirect("/home")
    // res.render("view.ejs", { post })
})





// Route : EDIT PAGE
app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id);
    // console.log(post)
    res.render("edit.ejs", { post })
})

// Route : DELETE PAGE
app.delete("/home/:id", (req, res) => {
    let { id } = req.params
    posts = posts.filter((p) => id !== p.id);
    // console.log(post)
    res.redirect("/home")
})