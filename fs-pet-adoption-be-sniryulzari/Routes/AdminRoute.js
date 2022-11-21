const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/AdminController");
const { upload, uploadToCloudinary } = require("../Middleware/ImagesMiddleware");
const { isAdmin } = require("../Middleware/AdminMiddleWare");
const { Auth } = require("../Middleware/AuthMiddleWare");

router.post('/add', Auth, isAdmin, upload.single('petImage'), uploadToCloudinary, AdminController.addPet);
router.get('/allusers', Auth, isAdmin, AdminController.getAllUsers);
router.get('/all', Auth, isAdmin, AdminController.getAllPets);
router.get("/:petId", Auth, isAdmin, AdminController.getPetById);
router.delete('/:petId', Auth, isAdmin, AdminController.deletePet);
router.put('/editpet', Auth, isAdmin, upload.single('petImage'), uploadToCloudinary, AdminController.editPet);

module.exports = router;

