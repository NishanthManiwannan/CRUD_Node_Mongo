const express = require("express");
const routes = express.Router();

const services = require("../services/render");

routes.get("/", services.homeRoutes);

routes.get("/add-user", services.adduser);

routes.get("/update_user", services.update_user);

module.exports = routes