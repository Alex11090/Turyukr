
const ToursList = require('../Models/ToursList')
const Tour = require('../Models/TourDiscription')



module.exports.GetListTours = async (req, res) => {
    let toursList = await ToursList.find()

    res.status(200).json(toursList)
}




console.log('hghggh');
module.exports.GetOneTour = async (req, res) => {

    if (req.params.id) {
        let findItem = await Tour.findOne({
            id: req.params.id
        })

        if (findItem) {
            res.status(200).json(findItem)
        } else {
            res.status(404).json(`Not found item with id ${req.body.id}`)
        }
    } else {
        res.status(500).json("Request dont have id on body")
    }
}
