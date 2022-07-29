import { Model, DataTypes } from 'sequelize'

export default function (sequelize) {
  class Order extends Model {}

  Order.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      food_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'foods',
          key: 'id',
        },
      },
      count: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
        }
      }
    },
    {
      createdAt: 'order_created_at',
      updatedAt: 'order_updated_at',
      sequelize,
      modelName: 'orders',
    }
  )
  
  return Order
}