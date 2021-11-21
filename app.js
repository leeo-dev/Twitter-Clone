const express = require("express");
const { join } = require("path");
const middleware = require("./middleware");
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.get("/", middleware.requireLogin, (request, response) => {
  const payLoad = { title: "Home" };
  response.status(200).render("home", payLoad);
});

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
