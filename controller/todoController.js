const express = require("express");
const router = express.Router();
const todoService = require('./../service/todo.service');


router.get("/", async(req, res) => {

    const page = parseInt(req.query.page ? req.query.page : 1);
    const limit = parseInt(req.query.limit ? ((req.query.limit <= 10) ? req.query.limit : 10) : 10);

    const result = await todoService.allTodo(page, limit);
    console.log(result);
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
    console.log(result);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });

});


router.patch("/", async(req, res) => {

    const statusEnum = ['pending', 'completed'];
    const id = parseInt(req.body.id);
    const status = req.body.status;
    console.log(id);
    console.log(status);
    if (isNaN(id) || status == undefined || !statusEnum.includes(status)) {
        return res.status(400).json({
            success: false,
            data: 'Please send valid status and id'
        });
    }


    const result = await todoService.updateTodo(parseInt(id), status);
    console.log(result);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });

});


module.exports = router;