exports.requireLogin = (request, response, next) => {
  if (!request.session || !request.session.user)
    return response.redirect("/login");
  next();
};
