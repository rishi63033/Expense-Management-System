const Income = require("../models/Income");

// Add new income
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const income = new Income({
      user: req.userId,
      title,
      amount,
      category,
      date,
      note,
    });

    await income.save();
    res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    console.error("Add income error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all incomes for logged-in user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Get income error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update income
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date, note } = req.body;

    const income = await Income.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, amount, category, date, note },
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({
      message: "Income updated successfully",
      income,
    });
  } catch (error) {
    console.error("Update income error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete income
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findOneAndDelete({
      _id: id,
      user: req.userId,
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({
      message: "Income deleted successfully",
      income,
    });
  } catch (error) {
    console.error("Delete income error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
