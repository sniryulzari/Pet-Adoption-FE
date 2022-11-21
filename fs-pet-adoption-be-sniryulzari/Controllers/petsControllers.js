const {
  searchPetsModel,
  getPetByIdModel,
  adoptPetStatusModel,
  fosterPetStatusModel,
  returnPetModel,
  savedPetInfoModel,
  adoptedPetInfoModel,
  fosteredPetInfoModel,
} = require("../Models/petsModel");

async function searchPets(req, res) {
  try {
    // console.log("controller query:",(req.query));
    const searchPets = await searchPetsModel(req.query);
    res.send(searchPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetById(req, res) {
  try {
    const { petId } = req.params;
    const pet = await getPetByIdModel(petId);
    res.send(pet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function adoptPetStatus(req, res) {
  try {
    const { userId } = req.body.userId;
    const petId = req.body.petId;
    await adoptPetStatusModel(userId, petId);
    // console.log(petStatus);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function fosterPetStatus(req, res) {
  try {
    const { userId } = req.body.userId;
    const petId = req.body.petId;
    const petStatus = await fosterPetStatusModel(userId, petId);
    // console.log(petStatus);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function returnPet(req, res) {
  try {
    const userId = req.body.userId;
    const petId = req.body.petId;
    const petStatus = await returnPetModel(userId, petId);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function getMySavedPet(req, res) {
  try {
    // console.log(req.params);
    const petInfo = await savedPetInfoModel(req.params);
    res.send(petInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function getMyAdoptedPet(req, res) {
  try {
    // console.log(req.params);
    const petInfo = await adoptedPetInfoModel(req.params);
    res.send(petInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function getMyFosteredPet(req, res) {
  try {
    // console.log(req.params);
    const petInfo = await fosteredPetInfoModel(req.params);
    res.send(petInfo);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = {
  searchPets,
  getPetById,
  adoptPetStatus,
  fosterPetStatus,
  returnPet,
  getMySavedPet,
  getMyAdoptedPet,
  getMyFosteredPet,
};
