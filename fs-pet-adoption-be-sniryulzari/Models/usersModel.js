const User = require("../Schemas/userSchemas");

async function signupModel(newUser) {
  try {
    const user = new User(newUser);
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmailModel(email) {
  try {
    const user = await User.findOne({ email });
    // console.log("user model:" ,user)
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function savePetModel(petId, userId) {
  try {
    const savePet = await User.updateOne(
      { _id: userId },
      { $push: { savedPet: petId.petId } }
    );
    return savePet;
  } catch (err) {
    console.log(err);
  }
}

async function deleteSavePetModel(petId, userId) {
  try {
    const deletePet = await User.updateOne(
      { _id: userId },
      { $pull: { savedPet: petId.petId } }
    );
    // console.log("deletePet:", deletePet);
    return deletePet;
  } catch (err) {
    console.log(err);
  }
}

async function adoptPetModel(petId, userId) {
  try {
    const adoptPet = await User.updateOne(
      { _id: userId },
      { $push: { adoptPet: petId } }
    );
    const deleteSavedPet = await User.updateOne(
      { _id: userId },
      { $pull: { savedPet: petId } }
    );
    const deleteFostredPet = await User.updateOne(
      { _id: userId },
      { $pull: { fosterPet: petId } }
    );

    return adoptPet;
  } catch (err) {
    console.log(err);
  }
}

async function fosterPetModel(petId, userId) {
  try {
    const fosterPet = await User.updateOne(
      { _id: userId },
      { $push: { fosterPet: petId } }
    );
    const deleteSavedPet = await User.updateOne(
      { _id: userId },
      { $pull: { savedPet: petId } }
    );
    const deleteadoptedPet = await User.updateOne(
      { _id: userId },
      { $pull: { adoptPet: petId } }
    );
    return fosterPet;
  } catch (err) {
    console.log(err);
  }
}

async function returnPetModel(petId, userId) {
  try {
    const returnPet = await User.updateOne(
      { _id: userId },
      { $pull: { adoptPet: petId, fosterPet: petId } }
    );
    return returnPet;
  } catch (err) {
    console.log(err);
  }
}

async function myPetsModel(userId) {
  try {
    const myPets = await User.find({ _id: userId });
    return myPets;
  } catch (err) {
    console.log(err);
  }
}

async function getUserInfoByIdModel(userId) {
  try {
    const userInfo = await User.findById({ _id: userId });
    // console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.log(err);
  }
}

async function editUserdModel(userId, newUserInfo) {
  try {
    const userInfo = await User.findByIdAndUpdate(userId, newUserInfo);
    return userInfo;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  signupModel,
  getUserByEmailModel,
  savePetModel,
  deleteSavePetModel,
  adoptPetModel,
  fosterPetModel,
  returnPetModel,
  myPetsModel,
  getUserInfoByIdModel,
  editUserdModel,
};
