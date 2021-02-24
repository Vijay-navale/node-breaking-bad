//core node modules
const path = require('path');
const characterInfoByName = require('./utils/characterInfoByName');
console.log(characterInfoByName);

//npm modules
const express = require('express'); //express is a function
const hbs = require('hbs');

//creating express application
const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public'); //by default it will detect index.html file
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebar location and views path
app.set('view engine', 'hbs'); //set() method will set setting for express server. after setting these hbs now it will not look for html file but instead will look for index.hbs file
app.set('views', viewsPath); //this views is by default setting in express where when we set
hbs.registerPartials(partialPath); //partials are nothing but a common html files throughout website like header and footer they are common components

//setup static directory to serve
app.use(express.static(publicDirPath)); //these use() method use to customize our server also these will start searching index.html file right now i have used handlers thats why it will go and find index.hbs. see think is that index.html is a standarized thing file to start with even express server needs to find it otherwise it throw error

app.get('', (req, res) => {
    res.render('index', {
        //we can use res.send() also
        title: 'BB Info',   
        name: 'VijayN',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'VijayN',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'VijayN',
    });
});

app.get('/getbbchar', (req, res) => {
    console.log(req.query);
    if (!req.query.character_name) {
        res.send({
            error:
                'Please provide search term and it should be correctly typed',
        });
        return;
    }
    characterInfoByName(
        req.query.character_name,
        ({ id, name, image, nickname } = {}) => {
            if(id){
                res.send({
                    charName: name,
                    charId: id,
                    nickname,
                    image,
                });

            }else{
                res.send({
                    error: 'Search result not found'
                })
            }
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term',
        });
        return;
    }
    res.send({
        products: [],
    });
    // console.log(req.query.search);    //res.query is an object which holds all our search queries
});

//for specific error on specific route
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'VijayN',
        errorMessage: 'Help article not found',
    });
});

//created 404 error route it is generic error page
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'VijayN',
        errorMessage: 'Page not found',
    });
});

//port is listening at 3000
app.listen(port, () => {
    console.log('Port is up and running' + port);
});
