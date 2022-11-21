const {
  signupModel,
  savePetModel,
  deleteSavePetModel,
  adoptPetModel,
  fosterPetModel,
  returnPetModel,
  myPetsModel,
  getUserInfoByIdModel,
  editUserdModel,
  isPetOwnerModel,
} = require("../Models/usersModel");

const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signup(req, res) {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    const userId = await signupModel(newUser);
    console.log(userId);
    if (userId) {
      res.send({ userId: userId, email, firstName, lastName, phoneNumber });
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    // console.log("user:",user);
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token, {
      maxAge: 9000000,
      httpOnly: true,
      sameSite: "none",
      secure: true / false,
    });
    res.send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

function logout(req, res) {
  try {
    if (req.cookies.token) {
      res.clearCookie("token");
      res.send({ ok: true });
    } else {
      throw new Error("No cookie to clear");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function savePet(req, res) {
  try {
    const savedpet = await savePetModel(req.params, req.body.userId);
    // console.log("savedpet:",savedpet);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteSavedPet(req, res) {
  try {
    const deletePet = await deleteSavePetModel(req.params, req.body.userId);
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function adoptPet(req, res) {
  try {
    const adoptPet = await adoptPetModel(req.params.petId, req.body.userId);
    const userId = req.body.userId;
    res.send({ userId });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function fosterPet(req, res) {
  try {
    const fosterPet = await fosterPetModel(req.params.petId, req.body.userId);
    const userId = req.body.userId;
    res.send({ userId });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function returnPet(req, res) {
  try {
    const fosterPet = await returnPetModel(req.params.petId, req.body.userId);
    const userId = req.body.userId;
    res.send(userId);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getMyPets(req, res) {
  try {
    const userId = req.body.userId;
    const myPets = await myPetsModel(userId);
    res.send(myPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserInfoById(req, res) {
  try {
    const userId = req.body.userId;
    const userInfo = await getUserInfoByIdModel(userId);
    // console.log("userInfo:", userInfo)
    res.send(userInfo);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function editUser(req, res) {
  try {
    const userId = req.body.userId;
    const newUserInfo = req.body;
    const userInfo = await editUserdModel(userId, newUserInfo);
    // console.log("userInfo:", userInfo)
    res.send({ ok: true });
  } catch (err) {
    res.status(500).send(err);
  }
}


module.exports = {
  signup,
  login,
  logout,
  savePet,
  deleteSavedPet,
  adoptPet,
  fosterPet,
  returnPet,
  getMyPets,
  getUserInfoById,
  editUser,
};
