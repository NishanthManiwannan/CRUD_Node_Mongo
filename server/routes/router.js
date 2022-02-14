const express = require("express");
const routes = express.Router();

const services = require("../services/render");
const  controller = require('../controller/controller')

routes.get("/", services.homeRoutes);

routes.get("/add-user", services.adduser);

routes.get("/update_user", services.update_user);

//--------- APIs
routes.post('/api/users', controller.create);
routes.get('/api/users', controller.find);
routes.put('/api/users/:id', controller.update);
routes.delete('/api/users/:id', controller.delete);

module.exports = routes