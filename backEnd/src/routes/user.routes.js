const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

// CRUD de Usuarios
router.get("/", userCtrl.getUsers);
router.post("/create-group", userCtrl.createGroup);
router.post("/create-admin", userCtrl.createAdmin);
router.get("/:id", userCtrl.getUser);
router.put("/:id", userCtrl.editUser);
router.delete("/:id", userCtrl.deleteUser);



module.exports = router;
