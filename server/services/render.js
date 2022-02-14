const axios = require('axios');

exports.homeRoutes = (req, res) => {
    // res.render("index", {users : "New Data"});
    axios.get('http://localhost:3000/api/users')
    .then
    (function(response){
        res.render('index', {users: response.data});
    })
    .catch(err => {
        res.send(err);
    })
}

exports.adduser = (req, res) => {
    res.render("add_user");
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params : {id: req.query.id}})
    .then(function(Userdata){
        console.log(Userdata.data)
        res.render("update_user", {user: Userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}