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
}
// Exportando a classe
export default new gameService()