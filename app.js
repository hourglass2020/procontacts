const express = require("express");
const {config} = require("dotenv");

const sequelize = require("./config/databse");
const {errorHandler} = require("./middlewares/errorHandler");

// Load Config
config({path:"./config/config.env"})

const app = express();

// Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Error Handling
app.use(errorHandler);

/*
app.get("/", (req, res) => {
    res.status(200).json({message: "salam api"})
})
*/


// Initial Server
const PORT = process.env.PORT || 7000;

sequelize
    .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV}`)
        })
    }).catch(err => console.error(err))
