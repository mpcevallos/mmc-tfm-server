const {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  login,
} = require("./usuario.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUsuario);
router.get("/", checkToken, getUsuarios);
router.get("/:id", checkToken, getUsuarioById);
router.patch("/", checkToken, updateUsuario);
router.delete("/", checkToken, deleteUsuario);
router.post("/login", login);

module.exports = router;
