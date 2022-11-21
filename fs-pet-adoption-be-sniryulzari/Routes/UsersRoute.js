const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/usersControllers");
const { validatebody } = require("../Middleware/Validatebody");
const { signupSchema, loginSchema, editUserSettongsSchema } = require("../Schemas/allSchemas");
const { passwordMatch, isNewUser, isExistingUser, hashPassword, verifyPassword } = require("../Middleware/UsersMiddleware")
const { Auth } = require("../Middleware/AuthMiddleWare");
const { isAdmin } = require("../Middleware/AdminMiddleWare");


router.post('/signup', validatebody(signupSchema), passwordMatch, isNewUser, hashPassword, UsersController.signup);
router.post('/login', validatebody(loginSchema), isExistingUser, verifyPassword, UsersController.login);
router.get('/logout', UsersController.logout);
router.get('/userInfo', Auth, UsersController.getUserInfoById);
router.put('/userInfo', Auth, validatebody(editUserSettongsSchema), hashPassword, UsersController.editUser);

router.put('/:petId', Auth, UsersController.savePet);
router.delete('/:petId', Auth, UsersController.deleteSavedPet);
router.put('/adopt/:petId', Auth, UsersController.adoptPet);
router.put('/foster/:petId', Auth, UsersController.fosterPet);
router.delete('/returnPet/:petId', Auth, UsersController.returnPet);
router.get('/mypets', Auth, UsersController.getMyPets);


module.exports = router;


