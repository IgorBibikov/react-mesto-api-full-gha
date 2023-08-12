const express = require("express");
const NotFoundErr = require("../errors/NotFoundErr");
const auth = require("../middlewares/auth");

const routes = express.Router();
const {
  ValidationСreateUser,
  ValidationLogin,
} = require("../middlewares/validation");

const { login, createUser, logout } = require("../controllers/users");

const { usersRoutes } = require("./users");
const { cardsRoutes } = require("./cards");

// Краш тест
routes.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

routes.post("/signin", ValidationLogin, login);
routes.post("/signout", logout);
routes.post("/signup", ValidationСreateUser, createUser);

routes.use(auth);

routes.use("/users", usersRoutes);
routes.use("/cards", cardsRoutes);

routes.use("/", (req, res, next) => {
  next(new NotFoundErr("Неверный путь."));
});

module.exports = { routes };
