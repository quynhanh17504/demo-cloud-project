const Food = require("../models/foodModel");

const FOOD_NOT_FOUND_MESSAGE = "Food not found";

async function getFoods(req, res) {
  const foods = await Food.findAll();
  return res.json(foods);
}

async function getFoodById(req, res) {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return res.status(404).json({ message: FOOD_NOT_FOUND_MESSAGE });
  }

  return res.json(food);
}

async function createFood(req, res) {
  const { name, description, price } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const food = await Food.create({
    name,
    description: description || "",
    price: price || 0
  });

  return res.status(201).json(food);
}

async function updateFood(req, res) {
  const { name, description, price } = req.body;
  const existingFood = await Food.findById(req.params.id);

  if (!existingFood) {
    return res.status(404).json({ message: FOOD_NOT_FOUND_MESSAGE });
  }

  const updatedFood = await Food.update(req.params.id, {
    name: name ?? existingFood.name,
    description: description ?? existingFood.description,
    price: price ?? existingFood.price
  });

  return res.json(updatedFood);
}

async function deleteFood(req, res) {
  const deletedFood = await Food.remove(req.params.id);

  if (!deletedFood) {
    return res.status(404).json({ message: FOOD_NOT_FOUND_MESSAGE });
  }

  return res.json({ message: "Food deleted successfully" });
}

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
