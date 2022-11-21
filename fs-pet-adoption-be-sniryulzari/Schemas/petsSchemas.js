const mongoose = require("mongoose");
const { Schema } = mongoose;

const petSchema = new Schema(
  {
    type: { type: String, required: true },
    breed: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    bio: { type: String, required: true },
    hypoallergenic: { type: String, required: true },
    dietaryRestrictions: { type: String, required: true },
    imageUrl: { type: String },
    userSaved: { type: String },
    adopt: { type: Array },
    foster: { type: Array },
    userId: { type: String },
  },
  { timestamps: true },
  { collection: "pets" }
);

const Pets = mongoose.model("Pets", petSchema);

module.exports = Pets;
