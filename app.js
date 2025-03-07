const express = require('express');
const morgan = require('morgan');

const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));  
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));    

const itemRoutes = require('./routes/itemRoutes');
// Use the routes
app.use('/items', itemRoutes);


// Default home route
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/new', (req, res) => {
    res.render('new');
});
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});


//starting the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
