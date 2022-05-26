const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.post('/add', todoController.add);
router.post('/list', todoController.list);
router.post('/delete', todoController.delete);
router.post('/update', todoController.update);

module.exports = router;