class Controller {
  async GET(req, res) {
    try {
      const { id } = req.params
      const users = req.models.users

      if (id) {
        const user = await users.findOne({ where: { id } })
        return { message: 'Ok', data: user || {} }
      }
      return res.send({ message: 'Ok', data: await users.findAll({ order: [["id", "ASC"]] }) || [] })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res) {
    try {
      const { fullname, contact } = req.body
      if (!(fullname && contact)) throw new Error("fullname and contact is require!");
      const inser_user = await req.models.users.create({ fullname, contact })

      return { message: 'user succesfully inserted.', data: inser_user || {} }
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res) {
    try {
      const { id } = req.params
      if (!id) throw new Error("id is require!")
      const updated_user = await req.models.users.update(req.body, { where: { id }, returning: true, plain: true })
      
      return { message: "ok", data: updated_user[1] || {} }
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res) {
    try {
      const { id } = req.params
      if (!id) throw new Error("id is require!")
      const user = await req.models.users.findOne({ where: { id } })
      /* delete user*/
      await req.models.users.destroy({ where: { id } })
      
      return { message: "ok", data: user || {} }
    } catch (error) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}

export default Controller
