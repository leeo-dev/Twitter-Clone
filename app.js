const express = require("express");
const { join } = require("path");
const route = require("./routes");
const app = express();
const PORT = 3000;
const dbConfig = require("./dbconfig");
const session = require("express-session");

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

//prettier-ignore
app.use(session({ secret: "MySession", resave: true, saveUninitialized: false }));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
