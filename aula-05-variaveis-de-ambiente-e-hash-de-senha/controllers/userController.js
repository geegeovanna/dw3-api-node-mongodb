// Importando o service
import userService from "../services/userService.js";
// Importando o JWT (Criação de token)
import jwt from "jsonwebtoken";

// Importando o Bcrypt
import bcrypt from "bcrypt"

// Importando as variáveis de ambiente (dotenv)
import dotenv from "dotenv";
// Configurando o dotenv
dotenv.config()

// Segredo para gerar o token da API
// const JWTSecret = 'thegames-secret'

// Acessando a variável armazenada no .env
const JWTSecret = process.env.JWTSECRET

// Função para CADASTRAR um usuário
const createUser = async(req, res) => {
    try {
        // Coletando os dados
        const {name, email, password } = req.body;

        // Gerando o HASH de senha
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        // Enviando para cadastrar 
        await userService.Create(name, email, hash);
        // Retornando uma resposta
        res.status(201).json({ message: 'Usuário cadastrado com sucesso.'})
        // Cod. 201 (CREATED)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário. Erro interno do servidor.'})
    }
}

// Função para AUTENTICAR o usuário (Função de login)
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        // Se o e-mail existe
        if (email != undefined) {
            // Buscando o usuário no banco
            const user = await userService.getOne(email)
            // Se o usuário for encontrado
            if (user != undefined) {
                // Verificando se o hash de senha 
                const correct = bcrypt.compareSync(password,user.password)
                // Verificando se o hash foi validado
                if (correct) {
                    // CRIAR O TOKEN
                    jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (error, token) => {
                        // FALHA
                        if (error) {
                            res.status(400).json({error: 'Não foi possível gerar o token da autenticação.'})  
                        // SUCESSO
                        } else {
                            res.status(200).json({message: 'Login realizado com sucesso!', token: token })
                        }
                    })
                    // Senha incorreta
                } else {
                    res.status(401).json({ error: 'Suas credenciais são inválidas. Acesso negado. Tente novamente.' })
                    // Cód. 401(UNAUTHORIZED)
                }
                // Usuário não encontrado
            } else {
                res.status(404).json({ error : 'Usuário informado não foi encontrado.' })
            } 
            // E-mail inválido ou vazio
        } else {
            res.status(404).json({ error: 'E-mail inválido ou não informado.'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Não foi possível cadastrar o usuário. Erro interno do servidor.'})
    }
}

export default { createUser, loginUser, JWTSecret };