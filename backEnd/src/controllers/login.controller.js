const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || "PalabraSecreta";
const User = require("../models/user");

const loginCtrl = {};

loginCtrl.login = async (req, res) => {
    await User.findOne({"username": req.body.username.toLowerCase()})
    .then( (user, err) => {

        if (err){ 
            return res.json({
                type: false,
                message: `Error: $(err)`    
            })
      
        } else if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            res.json({
                type: false,
                data: "Nombre de usuario o contraseña incorrecta."
            });    
        
        } else {
            console.log(!bcrypt.compareSync(req.body.password, user.password))
            var token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: '24h'});
            res.json({
                type: true,
                data: user,
                token
            });
        }
    });
}

loginCtrl.signup = async (req, res) => {
    req.body.username = req.body.username.toLowerCase();
    await User.findOne({ "username": req.body.username })
    .then( (err, user) => {
        if (err) {
            return res.json({
                type: false,
                data: `Error: $(err)`
            })
          
        } else if (user){
            return res.json({
                type: false,
                data: "El usuario ya existe.",
            });   
        
        } else {
            var newUser = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                phone: req.body.phone
            });
  
            newUser.save();
            
            
            return res.json({
                type: true,
                data: "Nuevo usuario creado",
            })
        }
    });
}

module.exports = loginCtrl;