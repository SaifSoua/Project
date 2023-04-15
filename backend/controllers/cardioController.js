const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Cardio = require("../models/cardio");
const controller = {};

/**
 * @route GET /api/cardios
 * @desc Get all users cardios
 * @access Private
 */
controller.getCardios = asyncHandler(async (req, res) => {
  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const cardios = await Cardio.find({ user: req.user.id });
  res.status(200).json(cardios);
});

/**
 * @route POST /api/cardios
 * @desc Add new cardio
 * @access Private
 */
controller.setCardio = asyncHandler(async (req, res) => {
  // console.log(req.body.name);
  // if (!req.body.name) {
  //   res.status(400);
  //   throw new Error('name is required');
  // }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    console.log(
      errors
        .array()
        .map((error) => error.msg)
        .join("\n")
    );
    throw new Error(
      errors
        .array()
        .map((error) => error.msg)
        .join("\n")
    );
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { distance } = req.body;

  const cardio = await Cardio.create({
    user: req.user.id,
    distance,
  });
  res.status(201).json(cardio);
});

/**
 * @route PUT /api/cardios/:id
 * @desc Update cardio
 * @access Private
 */
controller.updateCardio = asyncHandler(async (req, res) => {
  const cardio = await Cardio.findById(req.params.id);

  // Check if contact exists
  if (!cardio) {
    res.status(400);
    throw new Error("cardio not found");
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // console.log(contact.user, typeof contact.user)
  // console.log(req.user.id, typeof req.user.id);

  // Make sure the logged in user matches the contact user
  if (cardio.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCardio = await Cardio.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCardio);
});

/**
 * @route DELETE /api/cardios/:id
 * @desc Delete cardio
 * @access Private
 */
controller.deleteCardio = asyncHandler(async (req, res) => {
  const cardio = await Cardio.findById(req.params.id);

  // Check if cardio exists
  if (!cardio) {
    res.status(400);
    throw new Error("cardio not found");
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the cardio user
  if (cardio.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Cardio.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
});

// Export module
module.exports = controller;
