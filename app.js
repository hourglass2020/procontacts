const express = require("express");
const {config} = require("dotenv");

const sequelize = require("./config/databse");
const {errorHandler} = require("./middlewares/errorHandler");

const userRoutes = require("./routes/user");

// Load Config
config({path:"./config/config.env"})

const app = express();

// Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Error Handling
app.use(errorHandler);

// Routes
// app.use(indexRoutes);
app.use("/user", userRoutes)

// Initial Server
const PORT = process.env.PORT || 7000;

sequelize
    .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV}`)
        })
    }).catch(err => console.error(err))
