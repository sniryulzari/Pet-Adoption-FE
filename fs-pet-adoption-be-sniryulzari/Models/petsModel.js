const Pets = require("../Schemas/petsSchemas");

async function searchPetsModel(petsQuery) {
  try {
    const searchResult = await Pets.find(petsQuery);
    return searchResult;
  } catch (err) {
    console.log(err);
  }
}

async function getPetByIdModel(petId) {
  try {
    const pet = await Pets.findById(petId).exec();
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function adoptPetStatusModel(userId, petId) {
  try {
    const petStatus = await Pets.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Adopted", userId: userId } }
    );
    return petStatus;
  } catch (err) {
    console.log(err);
  }
}

async function fosterPetStatusModel(userId, petId) {
  try {
    const petStatus = await Pets.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Fostered", userId: userId } }
    );
    return petStatus;
  } catch (err) {
    console.log(err);
  }
}

async function returnPetModel(userId, petId) {
  try {
    const returnPet = await Pets.updateOne(
      { _id: petId },
      { $set: { adoptionStatus: "Available", userId: "" } }
    );
    // const deleteUser = await Pets.deleteOne(
    //   { _id: petId },
    //   { userId: userId }
    // );
    //delete user id from pet
    return returnPet;
  } catch (err) {
    console.log(err);
  }
}

async function savedPetInfoModel(id) {
  try {
    const { petId } = id;
    // console.log("petId:", petId);
    const petinfo = await Pets.findById({ _id: petId });
    // console.log("petinfo:", petinfo);
    return petinfo;
  } catch (err) {
    console.log(err);
  }
}

async function adoptedPetInfoModel(id) {
  try {
    const { petId } = id;
    // console.log("petId:", petId);
    const petinfo = await Pets.findById({ _id: petId });
    // console.log("petinfo:", petinfo);
    return petinfo;
  } catch (err) {
    console.log(err);
  }
}

async function fosteredPetInfoModel(id) {
  try {
    const { petId } = id;
    // console.log("petId:", petId);
    const petinfo = await Pets.findById({ _id: petId });
    // console.log("petinfo:", petinfo);
    return petinfo;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  searchPetsModel,
  getPetByIdModel,
  adoptPetStatusModel,
  fosterPetStatusModel,
  returnPetModel,
  savedPetInfoModel,
  adoptedPetInfoModel,
  fosteredPetInfoModel,
};
