const mapService= require('../Services/maps.service');
const {validationResult}= require('express-validator');

module.exports.getCoordinates= async (req, res, next) => {
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address }= req.query;
    try{
        const coordinates= await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(err){
        res.status(404).json({message:'Address not found'});
    }
}

module.exports.getDistanceTime= async (req, res, next) => {
    try {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination }= req.query;
        const distanceTime= await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'no route found'});
    }
}

module.exports.getCompleteSuggestions= async (req, res, next) => {
    try {
        const errors= validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input }= req.query;
        const suggestions= await mapService.getCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'no route found'});
    }
}