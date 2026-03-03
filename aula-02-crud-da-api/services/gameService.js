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
}
// Exportando a classe
export default new gameService()