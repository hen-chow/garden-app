# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Begin processing seed file"

User.destroy_all
Garden.destroy_all
Plant.destroy_all

user_1 = User.create(name: 'Hen', email: 'admin@admin.com', password: 'password')
user_2 = User.create(name: 'Foo', email: 'test@admin.com', password: 'password')
user_3 = User.create(name: 'Bar', email: 'testing@admin.com', password: 'password')

garden_1 = Garden.create(name: 'My 1st garden', user_id: user_1.id, lat: -33.865269, lon: 151.1960453, height: 200, width: 100)
garden_2 = Garden.create(name: "Foo's garden", user_id: user_2.id, lat: -37.813008, lon: 144.945882, height: 5500, width: 700)
garden_3 = Garden.create(name: 'Garden Bar', user_id: user_3.id, lat: 51.515314, lon: -0.126344, height: 450, width: 150)

plant_1 = Plant.create(garden_id: garden_1.id, name: 'basil', top: 20, left: 10)
plant_2 = Plant.create(garden_id: garden_1.id, name: 'lemon tree', top: 40, left: 30)
plant_3 = Plant.create(garden_id: garden_1.id, name: 'tomato', top: 30, left: 10)
plant_4 = Plant.create(garden_id: garden_1.id, name: 'basil', top: 25, left: 10)
plant_5 = Plant.create(garden_id: garden_1.id, name: 'rose', top: 35, left: 20)
plant_6 = Plant.create(garden_id: garden_1.id, name: 'tulip', top: 40, left: 25)

plant_7 = Plant.create(garden_id: garden_2.id, name: 'basil', top: 20, left: 10)
plant_8 = Plant.create(garden_id: garden_2.id, name: 'lemon tree', top: 40, left: 30)
plant_9 = Plant.create(garden_id: garden_2.id, name: 'tomato', top: 30, left: 10)
plant_10 = Plant.create(garden_id: garden_2.id, name: 'basil', top: 25, left: 10)
plant_11 = Plant.create(garden_id: garden_2.id, name: 'rose', top: 35, left: 20)
plant_12 = Plant.create(garden_id: garden_2.id, name: 'tulip', top: 40, left: 25)

plant_13 = Plant.create(garden_id: garden_3.id, name: 'basil', top: 20, left: 10)
plant_14 = Plant.create(garden_id: garden_3.id, name: 'lemon tree', top: 40, left: 30)
plant_15 = Plant.create(garden_id: garden_3.id, name: 'tomato', top: 30, left: 10)
plant_16 = Plant.create(garden_id: garden_3.id, name: 'basil', top: 25, left: 10)
plant_17 = Plant.create(garden_id: garden_3.id, name: 'rose', top: 35, left: 20)
plant_18 = Plant.create(garden_id: garden_3.id, name: 'tulip', top: 40, left: 25)

puts "Seed file processing completed"
