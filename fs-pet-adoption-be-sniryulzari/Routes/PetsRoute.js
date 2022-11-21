const express = require("express");
const router = express.Router();
const PetsController = require("../Controllers/petsControllers");
const { filterQuery } = require("../Middleware/PetsMiddleware");

router.get('/search', filterQuery, PetsController.searchPets);
router.get("/:petId", PetsController.getPetById);
router.put("/adopt", PetsController.adoptPetStatus);
router.put("/foster", PetsController.fosterPetStatus);
router.put('/returnPet', PetsController.returnPet);
router.get('/mySavedPets/:petId', PetsController.getMySavedPet);
router.get('/myAdoptedPets/:petId', PetsController.getMyAdoptedPet);
router.get('/myFosteredPets/:petId', PetsController.getMyFosteredPet);


module.exports = router;


