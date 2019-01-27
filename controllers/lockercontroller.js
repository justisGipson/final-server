const router = require('express').Router();
const sequelize = require('../db');
const Locker = sequelize.import('../models/locker');
const validateSesh = require('../middleware/validate-sesh');

// create new item in locker
router.post('/newItem', validateSesh, (req, res) => {
    if(!req.error){
        const newGear = {
            itemName: req.body.gear.itemName,
            description: req.body.gear.description,
            weight: req.body.gear.weight,
            quantity: req.body.gear.quantity,
            owner: req.user.id
        }
        Locker.create(newGear)
            .then(gear => res.status(200).json(gear))
            .catch(err => res.status(500).json({error: err}))
    }
});

// get all gear for specific user
router.get('/', validateSesh, (req, res) => {
    Locker.findAll({where: {owner: req.user.id}})
        .then(
            searchSuccess = (data) => {
                res.status(200).json({
                    items: data,
                    message: 'Found all gear items'
                })
            },
            searchFail = () => {
                res.status(500).json({
                    message: 'No gear found'
                })
            }
        )
        .catch(err => res.status(501).json({error: err}))
})
// get one locker item for specific user
router.get('/gear/:id', validateSesh, (req, res) => {
    Locker.findOne({where: {id: req.params.id, owner: req.user.id}})
        .then(
            searchSuccess = (data) => {
                res.status(200).json({
                    item: data
                })
            },
            searchFail = (err) => {
                res.status(500).json({
                    message: 'No item with that id'
                })
            }
        )
        .catch(err => res.status(503).json({error: err}))
})
// update locker item
router.put('/update/:id', validateSesh, (req, res) => {
    Locker.update({
        itemName: req.body.gear.itemName,
        description: req.body.gear.description,
        weight: req.body.gear.weight,
        quantity: req.body.gear.quantity
    },
        {where: {id: req.params.id, owner: req.user.id}
    })
    .then(
        updateSuccess = (item) => {
            res.status(200).json({
                item: item,
                message: "Update Successful"
            })
        },
        updateFail = (err) => {
            res.status(500).json({
                message: "Update Failed"
            })
        }
    )
    .catch(err => res.status(503).json({error: err}))
})
// delete locker item
router.delete('/removeItem/:id', validateSesh, (req, res) => {
    Locker.destroy({
        where: {id: req.params.id, owner: req.user.id}
    })
    .then(
        deleteSuccess = (item) => {
            res.status(200).json({
                item: item,
                message: "Item Removed"
            })
        },
        deleteFail = (err) => {
            res.status(500).json({
                message: "Removal Failed"
            })
        }
    )
    .catch(err => res.status(503).json({error: err}))
})

module.exports = router;