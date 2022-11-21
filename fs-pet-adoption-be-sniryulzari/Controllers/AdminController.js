const {
  getAllPetsModel,
  AddPetModel,
  getPetByIdModel,
  getAllUsersModel,
  deletePetModel,
  editPetModel,
} = require("../Models/adminModel");

async function getAllPets(req, res) {
  try {
    const allPets = await getAllPetsModel();
    res.send(allPets);
    return allPets;
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addPet(req, res) {
  try {
    const {
      type,
      breed,
      name,
      adoptionStatus,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      imageUrl,
    } = req.body;

    const newPet = {
      type: type,
      breed: breed,
      name: name,
      adoptionStatus: adoptionStatus,
      height: height,
      weight: weight,
      color: color,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietaryRestrictions: dietaryRestrictions,
      imageUrl: imageUrl,
    };
    const petId = await AddPetModel(newPet);

    if (petId) {
      res.send(petId);
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetById(req, res) {
  try {
    const { petId } = req.params;
    const petInfo = await getPetByIdModel(petId);
    // console.log(petInfo);
    res.send(petInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await getAllUsersModel();
    // console.log(allUsers);
    res.send(allUsers);
    return allUsers;
  } catch (err) {
    res.status(500).send(err);
  }
};

async function deletePet(req, res) {
  try {
    const petId = req.params.petId
    const deletePet = await deletePetModel(petId);
    // console.log("deletePet:", deletePet)
    res.send({ ok: true })
  } catch (err) {
    res.status(500).send(err);
  }
};


async function editPet(req, res) {
  try {
    const {
      type,
      breed,
      name,
      adoptionStatus,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      imageUrl
    } = req.body;

    const petId = req.body._id;
    const pet = await editPetModel(req.body, petId);
    // console.log(pet)
    res.send({ ok: true})
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addPet,
  getAllPets,
  getPetById,
  getAllUsers,
  deletePet,
  editPet,
};
