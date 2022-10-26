const express = require('express');

const configViewEngine = (app) => {
    app.set("view engine", "ejs")  //cau hinh ejs la viewengine
    app.set("views", "./src/views") //mac dinh folder viet cac view
}

module.exports = configViewEngine