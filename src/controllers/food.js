import config from '../../config.js'

class Controller {
  async GET(req, res) {
    try {
      const { id } = req.params
      const foodModel = req.models.foods
      const pagination = config.pagination
      const { page, limit } = { page: req.query.page || pagination.page, limit: req.query.limit || pagination.limit }
      if (id) {
        const food = await foodModel.findOne({ where: { id } })
        return res.send({ message: 'Ok', data: food || {} })
      }

      const foods = await foodModel.findAll({ order: [["id", "ASC"]] })
      return res.send({ message: 'Ok', data: foods.slice(page * limit - limit, page * limit) || [] })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async POST(req, res) {
    try {
      if (!(req.body.name && req.body.price)) throw new Error("foodname and price is require!")
      
      const foodModel = req.models.foods
      const { name, price } = req.body
      const new_food = await foodModel.create({ name, price })

      return res.send({ message: 'food succesfully inserted.', data: new_food || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async PUT(req, res) {
    try {
      if (!req.params.id) throw new Error("id is require!")

      const foodModel = req.models.foods
      const { id } = req.params
      const updated_food = await foodModel.update(req.body, { where: { id }, returning: true, plain: true })
      
      return res.send({ message: "ok", data: updated_food[1] || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }

  async DELETE(req, res) {
    try {
      if (!req.params.id) throw new Error("id is require!")

      const foodModel = req.models.foods
      const { id } = req.params  
      const food = await foodModel.findOne({ where: { id } })
      await foodModel.destroy({ where: { id } })

      return res.send({ message: "ok", data: food || {} })
    } catch (err) {
      return res.send({ message: err.errors ? err.errors[0].message : err.message, data: {} })
    }
  }
}


export default Controller