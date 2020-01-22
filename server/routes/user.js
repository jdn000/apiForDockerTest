const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

router.post(
  "/user",user.createUser
);
router.get("/users", user.getUsers);
/*router.get(
  "/users/deleted",
  [verificaToken, verificaAdmin_rol],
  usuario.getDeletedUsers
);
router.get(
  "/user/rut/:rut",
  [verificaToken, verificaAdmin_rol],
  usuario.getUserByRut
);
router.get(
  "/user/name/:nombre&:apPat&:apMat",
  [verificaToken, verificaAdmin_rol],
  usuario.getUserByName
);
router.put("/user/:id", [verificaToken, verificaAdmin_rol, setHeaders], usuario.updateUser);

router.delete(
  "/user/:rut",
  [verificaToken, verificaAdmin_rol],
  usuario.deleteUser
);*/
module.exports = router;