const express = require('express');
const morgan = require('morgan'); //Morgan is third party middleware logger
const mongoose = require('mongoose');
//const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
//ExpressJS
const app = express();
//connect to mongoDB
const dbURI = 'mongodb+srv://devdatt17:devdatt123@fullstack-tut.zur5f.mongodb.net/fullstack-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


//register view engine for doing things dynamically
app.set('view engine', 'ejs');
//if you want to save views to any other folder then 
//you can write app.set('view engine','foldername')

//listening request
//app.listen(3000);

//middleware and static file
app.use(express.static('public')); //now public file is available to use
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
//to add the information in database use '/add-blog' 


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
})

//get 
app.get('/', (req, res) => {
    //Routing and HTML
    // res.send('<p>Using express</p>');
    //for sending html files
    //res.sendFile('./views/index.html',{root:_dirname};
    //path module can also be used
    res.redirect('/blogs');
    //Instead of this we are gonna render the view
    // res.sendFile('./views/index.html', { root: __dirname });
    //
});

app.get('/about', (req, res) => {
    //Routing and HTML
    // res.send('<p>Using express</p>');
    //for sending html files
    //res.sendFile('./views/index.html',{root:_dirname};
    //path module can also be used
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('./about');
// });

//404 error use() function uses middleware
/*
if this function below is used before any of the .get
then it will not be shown
*/
app.use((req, res) => {
    //at this point express is showing Erro404 file just like any other file
    //without realizing that it is a 404 
    //to get that we can use
    //res.sendFile('./views/Error404.html', { root: __dirname })
    // res.status(404).sendFile('./views/Error404.html', { root: __dirname });
    res.status(404).render('Error404', { title: '404' });
});