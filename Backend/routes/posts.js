const express = require("express");
const router = express.Router();

//import express validator
const { body, validationResult } = require("express-validator");

//import database
const connection = require("../config/database");

/**
 * INDEX POSTS
 */
router.get("/", function (req, res) {
  //query
  connection.query(
    "SELECT * FROM posts ORDER BY id desc",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Posts",
          data: rows,
        });
      }
    }
  );
});

/**
 * STORE POST
 */
router.post(
  "/store",
  [
    //validation
    //validation
    body("judul").notEmpty().withMessage("judul tidak boleh kosong"),
    body("content").notEmpty().withMessage("Content tidak boleh kosong"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    //define formData
    let formData = {
      judul: req.body.judul,
      content: req.body.content,
    };

    // insert query
    connection.query("INSERT INTO posts SET ?", formData, function (err, rows) {
      //if(err) throw err
      if (err) {
        console.error("Database Query Error:", err); // <-- TAMBAHKAN BARIS INI
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err, // Opsional: mengirim detail error untuk debugging
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Insert Data Successfully",
          data: rows[0],
        });
      }
    });
  }
);

module.exports = router;
