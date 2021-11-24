const express = require("express");
const middleware = require("./middleware");
const User = require("./schemas/UserSchema");
const DEFAULT_OPTION = {
  minLength: 3,
  maxLength: 25,
  fields: [
    "firstName",
    "lastName",
    "username",
    "email",
    "password",
    "confirmPassword",
  ],
};

const route = express.Router();

route.get("/login", (request, response) => {
  response.status(200).render("login");
});
route.get("/register", (request, response) => {
  response.status(200).render("register");
});
route.post("/register", async (request, response) => {
  let errors = [];
  //prettier-ignore
  const newUser = request.body;
  const requiredFields = DEFAULT_OPTION.fields.join(",");
  const receivedFields = Object.keys(newUser).join(",");
  try {
    if (requiredFields !== receivedFields) {
      throw new Error(["error", "Something went wrong! try again later"]);
    }
    for (let field in newUser) {
      if (newUser[field].length === 0)
        errors.push([field, "This field must not be empty"]);
      if (newUser[field].length < DEFAULT_OPTION.minLength)
        //prettier-ignore
        errors.push([field, `This field must contain at least ${DEFAULT_OPTION.minLength} characters`]);
      if (newUser[field].length > DEFAULT_OPTION.maxLength)
        //prettier-ignore
        errors.push([field, `The Maximum Length of a field can be ${DEFAULT_OPTION.maxLength} character`]);
    }

    if (newUser.password !== newUser.confirmPassword) {
      //prettier-ignore
      errors.push(["confirmPassword", "password and confirm password does not match"]);
    }
    if (errors.length > 0) throw new Error(errors);

    const isThereAnyUsernameOrEmail = await User.findOne({
      $or: [{ username: newUser.username }, { email: newUser.email }],
    });
    if (isThereAnyUsernameOrEmail)
      throw new Error(["error", "E-mail or username in use"]);

    const user = await User.create(newUser);
    console.log(user);
  } catch (error) {
    const arrayError = error.message.split(",");
    const objectError = Object.fromEntries([arrayError]);
    return response.status(200).render("register", { ...objectError });
  }

  // console.log(requiredFields);
  response.status(200).render("register");
});

route.get("/", middleware.requireLogin, (request, response) => {
  const payLoad = { title: "Home" };
  response.status(200).render("home", payLoad);
});

module.exports = route;
