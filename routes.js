const express = require("express");
const middleware = require("./middleware");

const route = express.Router();

route.get("/login", (request, response) => {
  response.status(200).render("login");
});

route.get("/", middleware.requireLogin, (request, response) => {
  const payLoad = { title: "Home" };
  response.status(200).render("home", payLoad);
});

module.exports = route;
