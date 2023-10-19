const {Users, Items} = require("../models");
const jtw = require("jsonwebtoken");

class UsersController {
    static async loginUsers(req, res) {
        try {
            const {email, password} = req.body
            const data = await Users.findOne(
                {
                    where:
                        {
                            email: email,
                        }
                }
            )
            if (data) {
                const token = jtw.sign({data}, process.env.SECRET)
                data.password === password ?
                    res.status(200).json({data:data, token:token}) :
                    res.status(400).json({message: 'Incorrect Password.'})
            } else {
                res.status(400).json({message: 'Email not found.'})
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async registerUsers(req, res) {
        try {
            const {username, email, password, role} = req.body
            const image = "https://via.placeholder.com/100"
            const result = await Users.create({
                username, email, password, image: image, role
            })
            res.status(201).json(result)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getDetailsUser(req, res) {
        try {
            const id = req.params.id
            const result = await Users.findByPk(id)
            result ?
                res.status(200).json(result) :
                res.status(400).json({message: `Users ID ${id} not found.`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async deleteUsers(req, res) {
        try {
            const result = await Users.destroy({where: {id: req.params.id}})
            result === 1 ?
                res.status(200).json({message: `Users ID ${req.params.id} has been deleted.`}) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been deleted.`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updateUsers(req, res) {
        try {
            const {username, email, password, image, role} = req.body
            const result = await Users.update({
                username, email, password, image, role
            }, {
                where: {id: req.params.id}
            })
            result[0] === 1 ?
                res.status(200).json({message: `Users ID ${req.params.id} has been updated`}) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been updated`})
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async getUsers(req, res) {
        try {
            const items = await Users.findAll({order:['id']})
            res.status(200).json(items)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = UsersController