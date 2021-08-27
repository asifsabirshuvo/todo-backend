const express = require("express");
const router = express.Router();
const subtaskService = require('./../service/subtask.service');


router.post("/", async(req, res) => {

    const subtaskTitle = req.body.title;
    const todoId = req.body.todoId;
    if (subtaskTitle == undefined || todoId == undefined) {
        return res.status(400).json({
            success: false,
            data: 'Please send title and todoId'
        });
    }

    const result = await subtaskService.createSubtask(subtaskTitle, todoId);
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


    const result = await subtaskService.updateSubtask(parseInt(id), status);
    return res.status(result.status).json({
        success: result.success,
        data: result.data
    });

});


module.exports = router;