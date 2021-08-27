const express = require("express");
const router = express.Router();
const todoService = require('./../service/todo.service');


router.get("/", async(req, res) => {

    const page = parseInt(req.query.page ? req.query.page : 1);
    const limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);

    const result = await todoService.allTodo(page, limit);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });
});



router.post("/", async(req, res) => {

    const todoTitle = req.body.title;
    if (todoTitle == undefined) {
        return res.status(400).json({
            success: false,
            data: 'Please send title'
        });
    }

    const result = await todoService.createTodo(todoTitle);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });

});


router.patch("/", async(req, res) => {

    const statusEnum = ['pending', 'completed'];
    const id = parseInt(req.body.id);
    const status = req.body.status;
    if (isNaN(id) || status == undefined || !statusEnum.includes(status)) {
        return res.status(400).json({
            success: false,
            data: 'Please send valid status and id'
        });
    }


    const result = await todoService.updateTodo(parseInt(id), status);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });

});


module.exports = router;