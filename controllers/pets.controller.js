const { getPets, addPets, removePets } = require("../service/pets");
const { BadRequest, Unauthorized } = require("http-errors");

const getPetsСontroller = async (req, res) => {
  const { id } = req.user;
  const currentUser = await getPets(id);
  const result = currentUser.userPets;

  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

const addPetСontroller = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    throw Unauthorized(401, "Not found");
  }
  const result = await addPets(req.body, owner);
  if (!result) {
    throw BadRequest(404, "Not found");
  }

  res.json(req.body);
};
const removePetСontroller = async (req, res) => {
  const { id: owner } = req.user;
  if (!owner) {
    throw Unauthorized(401, "Not found");
  }
  const { petId } = req.params;
  if (!petId) {
    throw BadRequest(404, "Not found");
  }
  const result = await removePets(petId, owner);
  res.status(200).json({ message: "deleted" });
};

module.exports = {
  getPetsСontroller,
  addPetСontroller,
  removePetСontroller,
};
