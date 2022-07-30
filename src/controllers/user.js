import config from "../../config.js"

class Controller {
  async GET(req, res) {
    try {
      const userModel = req.models.users
      const { id } = req.params
      const pagination = config.pagination
      const { page, limit } = { page: req.query.page || pagination.page, limit: req.query.limit || pagination.limit }
      if (id) {
        const user = await userModel.findOne({ where: { id } })
        return res.send({ message: 'Ok', data: user || {} })
      }

      const users = await userModel.findAll({ order: [["id", "ASC"]] })
      return res.send({ message: 'Ok', data: users.slice(page * limit - limit, page * limit) || [] })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res) {
    try {
      if (!(req.body.fullname && req.body.contact)) throw new Error("fullname and contact is require!");
      
      const userModel = req.models.users
      const { fullname, contact } = req.body
      const inser_user = await userModel.create({ fullname, contact })
      
      return res.send({ message: 'user succesfully inserted.', data: inser_user || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res) {
    try {
      if (!req.params.id) throw new Error("id is require!")
      
      const userModel = req.models.users
      const { id } = req.params
      const updated_user = await userModel.update(req.body, { where: { id }, returning: true, plain: true })
      
      return res.send({ message: "ok", data: updated_user[1] || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res) {
    try {
      if (!req.params.id) throw new Error("id is require!")
      
      const userModel = req.models.users
      const { id } = req.params
      const user = await userModel.findOne({ where: { id } })
      await userModel.destroy({ where: { id } })

      return res.send({ message: "ok", data: user || {} })
    } catch (error) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}

export default Controller
