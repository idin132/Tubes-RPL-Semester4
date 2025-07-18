const Menu = require("../models/Menu");

exports.getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.CreateMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.UpdateMenu = async (req, res) => {
  try {
    await Menu.update(req.body, {
      where: { id_menu: req.params.id },
    });
    res.json({ message: "Menu updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.DeleteMenu = async (req, res) => {
  try {
    await Menu.destroy({ where: { id_menu: req.params.id } });
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
