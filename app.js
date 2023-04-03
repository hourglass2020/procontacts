const express = require("express");

const app = express();

const PORT = 7000;

app.get("/", (req, res)=> {
    res.status(200).json({message: "salam api"})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in develop environment`)
})