const path = require('path');
const express = require('express');
const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require("cors");
require('dotenv').config();

// Sets up the Express App
// =============================================================
const app = express();
//LOCAL
app.use(cors())
//DEPLOYED
// app.use(cors({
//     origin:["https://reactauthdemo-front.herokuapp.com"]
// }))
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use('/', allRoutes);

// User logins (kp)
const routes = require("./controllers");


// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 2
    },
     store: new SequelizeStore({
        db:sequelize
    })
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)
// User logins (kp)

sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });
});