const router = require("express").Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");

// register user
router.post("/register", async (req, res) => {
  try {
    // generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(req.body.password);
    console.log(hashedPassword);

    //
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    // find user
    const findedUser = await userModel.findOne({
      username: req.body.username,
    });
    console.log(findedUser);
    !findedUser && res.status(400).json("Nieprawidłowe hasło lub nazwa użytkownika");

    // validate password
    const validPassword = await bcrypt.compare(req.body.password, findedUser.password);
    !validPassword && res.status(400).json("Nieprawidłowe hasło lub nazwa użytkownika");
    res.status(200).json({
      _id: findedUser._id,
      username: findedUser.username,
    });

  } catch (err) {
    res.status(500).json("Nieprawidłowe hasło lub nazwa użytkownika");
  }
});


router.get("/", async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({
      numberOfUsers: await userModel.count(),
      allUsers,
    });
  } catch (err) {
    res.status(500).json("Nie mogę pobrać wszystkich użytkowników");
  }
});

module.exports = router;
