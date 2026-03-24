import mongoose from "mongoose";

// O campo "descriptions" será um documento alinhado
const descriptionSchema = new mongoose.Schema({
    genre: String, // gênero
    platform: String, // plataforma
    rating: String, // classificação de idade
})

const gameSchema = new mongoose.Schema({
    title: String,
    year: Number,
    price: Number,
    descriptions : descriptionSchema

    // Definindo o campo como array
    // descriptions : [descriptionSchema]

});
const Game = mongoose.model('Game', gameSchema)

export default Game;