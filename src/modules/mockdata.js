export default async function (sequelize) {
  const users = await sequelize.models.users.build([
    { fullname: "Olim Qodirov", contact: "+9989909812341" },
    { fullname: "Shoxjahon Abdullajonov", contact: "+998336547945" },
    { fullname: "Yo'ldosh Xamroqulov", contact: "+998971236856" },
  ])

  const foods = await sequelize.models.foods.build([
    { name: "Lavash", price: 22000 }, 
    { name: "Gamburger", price: 24000 }, 
    { name: "Big Lavash", price: 24000 },
    { name: "Shaurma", price: 30000 } 
  ])

  const orders = await sequelize.models.orders.build([
    { user_id: 6, food_id: 5, count: 1 },
    { user_id: 6, food_id: 6, count: 2 },
    { user_id: 7, food_id: 8, count: 3 },
    { user_id: 8, food_id: 6, count: 1 },
  ])

  await Promise.all(users.map(async user => await user.save()))
  await Promise.all(foods.map(async food => await food.save()))
  await Promise.all(orders.map(async order => await order.save()))
}