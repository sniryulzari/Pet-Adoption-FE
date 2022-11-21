const { findByIdAndUpdate } = require("../Schemas/petsSchemas");
const Pets = require("../Schemas/petsSchemas");
const User = require("../Schemas/userSchemas");

async function getAllPetsModel() {
  try {
    const allPets = await Pets.find();
    // console.log(allPets);
    return allPets;
  } catch (err) {
    console.log(err);
  }
}

async function AddPetModel(newPet) {
  try {
    const pet = new Pets(newPet);
    await pet.save();
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function getPetByIdModel(petId) {
  try {
    const petInfo = await Pets.findById(petId).exec();
    return petInfo;
  } catch (err) {
    console.log(err);
  }
}

async function getAllUsersModel() {
  try {
    const allUsers = await User.find();
    // console.log(allUsers);
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  try {
    const deletePet = await Pets.findOneAndDelete({ _id: petId });
    // console.log("deletePet:", deletePet)
    return deletePet;
  } catch (err) {
    console.log(err);
  }
}

async function editPetModel(newPet, petId) {
  try {
    const pet = await Pets.findByIdAndUpdate(
        petId ,
         newPet
      );
    // console.log(pet);

    return pet;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllPetsModel,
  AddPetModel,
  getPetByIdModel,
  getAllUsersModel,
  deletePetModel,
  editPetModel,
};
