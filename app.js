const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
  response.status(200).send("Hello Guys!");
});

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
