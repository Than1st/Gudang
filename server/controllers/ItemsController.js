const {Items, Users} = require('../models')
const {all} = require("express/lib/application");

class ItemsController {
    static async createItems(req, res) {
        try {
            const {name, category, price, stock, userid} = req.body
            const image = "https://via.placeholder.com/100"
            const result = await Items.create({
                name, category, price, stock, image: image, UserId: +userid
            })
            res.status(201).json({message:`Items ${name} berhasil di tambahkan!`, data: result})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updateItems(req, res) {
        try {
            const {name, category, price, stock, image, userid} = req.body
            const result = await Items.update({
                name, category, price, stock, image, userid
            }, {
                where: {id: req.params.id}
            })
            result[0] === 1 ?
                res.status(200).json({message: `Items ${name} has been updated`}) :
                res.status(400).json({message: `Items ID ${req.params.id} has not been updated`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async deleteItems(req, res) {
        try {
            const result = await Items.destroy({where: {id: req.params.id}})
            result === 1 ?
                res.status(200).json({message: `Items ID ${req.params.id} has been deleted.`}) :
                res.status(400).json({message: `Items ID ${req.params.id} has not been deleted.`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getDetailsItem(req, res) {
        try {
            const id = req.params.id
            const result = await Items.findByPk(id)
            result ?
                res.status(200).json(result) :
                res.status(400).json({message: `Items ID ${id} not found.`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getItems(req, res) {
        try {
            const items = await Items.findAll({order:['id'],include:[Users]})
            res.status(200).json(items)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = ItemsController