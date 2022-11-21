const signupSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    phoneNumber: { type: "string", minLength: 1 },
    email: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 6 },
    repassword: { type: "string" },
  },
  required: [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
    "repassword",
  ],
  additionalProperties: false,
};


const loginSchema = {
  type: "object",
  properties: {
    email: {type: "string", minLength: 6},
    password: {type: "string", minLength: 6},
  },
  required: ["email", "password"],
  additionalProperties: false
}

const editUserSettongsSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    phoneNumber: { type: "string", minLength: 10 },
    email: { type: "string", minLength: 10 },
    password: { type: "string", minLength: 6 },
    bio: { type: "string" , maxLength: 140 },
  },
  required: [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
  ],
  additionalProperties: true,
};


module.exports = { signupSchema, loginSchema, editUserSettongsSchema };
