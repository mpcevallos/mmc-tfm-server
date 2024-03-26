const {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  getUsuarioByEmail,
} = require("./usuario.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUsuario: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createUsuario(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUsuarios: (req, res) => {
    getUsuarios((err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: "getUsuarioError: " + err,
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsuarioById: (req, res) => {
    const id = req.params.id;
    getUsuarioById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
        //return res.status
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "getUsuarioById: Record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsuario: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUsuario(body, (err, results) => {
      console.log({ results });
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "UpdateUsuarioError",
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: "UpdateUsuario: Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Usuario updated succesfully",
      });
    });
  },
  deleteUsuario: (req, res) => {
    const body = req.body;
    deleteUsuario(body, (err, results) => {
      console.log({ results });
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "DeleteUsuarioError",
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: 0,
          message: "DeleteUsuario: Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Usuario deleted succesfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    //console.log({body});
    getUsuarioByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      // console.log({results});
      // console.log(body.password);
      // console.log(results.password);
      // console.log(results.nombre);

      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JSONWEBTOKEN, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken,
          userId: results.id,
          usuario: results.nombre + " " + results.apellido,
          avatarImg: results.imagen,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
};
