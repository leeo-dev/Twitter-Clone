const express = require("express");
const { join } = require("path");
const route = require("./routes");
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route);

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
