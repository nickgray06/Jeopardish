# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'rest-client'
require 'json'


Clue.destroy_all
Category.destroy_all


cat1 = Category.create(title: 'potpourri')
cat2 = Category.create(title: 'technology')
cat3 = Category.create(title: 'science')
cat4 = Category.create(title: 'video games')
cat5 = Category.create(title: 'mythology')
cat6 = Category.create(title: '3-letter words')

@potpourri = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=306"))
@technology = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=348"))
@science = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=25"))
@video_games = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=1892"))
@mythology = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=680"))
@words = JSON.parse(RestClient.get("http://jservice.io/api/clues?category=105"))

@potpourri.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat1)
end

@technology.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat2)
end

@science.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat3)
end

@video_games.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat4)
end

@mythology.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat5)
end

@words.each do |clue|
  Clue.create(value: clue["value"], answer: clue["answer"], question: clue["question"], category: cat6)
end
