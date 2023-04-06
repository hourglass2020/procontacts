const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("contacts-api");
const {config} = require("dotenv");

const sequelize = require("./config/databse");
const {errorHandler} = require("./middlewares/errorHandler");

//? Load Config
config({path: "./config/config.env"})
const winston = require("./config/winston");

const app = express();

//? Logging
if (process.env.NODE_ENV === "development") {
    debug("Morgan Enabled");
    app.use(morgan("combined", {stream: winston.stream}));
}

//? Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//? Routes
// app.use(indexRoutes);
app.use("/users", require("./routes/user"))
app.use("/contact", require("./routes/contact"))
app.use("/label", require("./routes/label"))

//? Error Handling
app.use(errorHandler);

//? Initial Server
const PORT = process.env.PORT || 7000;
sequelize
    .sync()
    .then(result => {
        debug("Connected to database");
        app.listen(PORT, () => {
            debug("Server is running");
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV}`)
        })
    }).catch(err => console.error(err))
