const express = require('express')
const Router = express.Router()
const controllers = require('../Controllers/tours')

Router.get('/test', (req, res) => {
    res.status(200).json({
        message: "Test"
    })
})

Router.get('/get-list', controllers.GetListTours)



//Router.get('/filter-price', controllers.FilterPriceList)

Router.post(`/get-item/:id`, controllers.GetOneTour)

module.exports = Router