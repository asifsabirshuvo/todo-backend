const express = require("express");
const router = express.Router();
const todoService = require('../service/todo.service');

const { check, validationResult } = require("express-validator"); //to validate form
const { query, queryValidationResult } = require("express-validator"); //to validate form


router.get("/", async(req, res) => {

    const page = parseInt(req.query.page ? req.query.page : 1);
    const limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);

    const result = await todoService.allTodo(page, limit);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });
});

module.exports = router;