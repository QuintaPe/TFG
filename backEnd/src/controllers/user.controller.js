const User = require("../models/user");
const userCtrl = {};


userCtrl.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);
};


userCtrl.createGroup = async (req, res, next) => {
    const group = new User({
        username: req.body.username,
        password: req.body.password,
        rol: 0,
        
        groupName: req.body.groupName,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    });
    await group.save();
    res.json({ status: "Group created" });
};

userCtrl.createAdmin = async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        rol: req.body.rol,
        
        name: req.body.name,
        lastName: req.body.name,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
    });
    await user.save();
    res.json({ status: "Gestor/Admin created" });
};


userCtrl.getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
};


userCtrl.editUser = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ status: "User Updated" });
};


userCtrl.deleteUser = async (req, res, next) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: "User Deleted" });
};


module.exports = userCtrl;
