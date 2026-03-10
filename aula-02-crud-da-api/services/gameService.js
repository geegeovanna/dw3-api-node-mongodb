// Importando o Model
import Game from "../models/Games.js"

class gameService {
    // Método (serviço) para buscar todos os registros no banco
    // funções assíncronas são não bloqueantes
    async getAll() {
        // try trata o sucesso
        try {
            // .find() -> é método do mongoose para buscar registros no banco
            const games = await Game.find()
            return games

        // catch trata a falha
        } catch (error) {
            console.log(error)
        }
    }

    // Método para cadastrar clientes
    async Create(title, platform, year, price){
        try {
            const newGame = new Game({
                // Desestruturação - (title) = (title : title)
                title,
                platform,
                year,
                price
            })
            // Gravando no banco
            await newGame.save() 
            // .set() - Método do Mongoose para cadastrar no BD.
        } catch (error) {
            console.log(error)
        }
    }

    // Método para excluir um jogo
    async Delete(id) {
        try {
            // Excluindo o jogo pelo id
            await Game.findByIdAndDelete(id)
            console.log(`Game com a id: ${id} foi deletado.`)
        } catch (error) {
            console.log(error)
        }
    }

    // Método para alterar um jogo
    async Update(id, title, platform, year, price) {
        try {
            const updatedGame = await Game.findByIdAndUpdate(id, {
                title, 
                platform,
                year,
                price
            },
                { new: true }
            )
            console.log(`O jogo com o ID ${id} foi alterado.`)
            return updatedGame
        } catch (error) {
            console.log(error)
        }
    }

    // Método para listar um jogo único
    async getOne(id) {
        try {
            const game = await Game.findOne({ _id: id })
            return game
        } catch (error) {
            console.log(error)
        }
    }
}

// Exportando a classe
export default new gameService()