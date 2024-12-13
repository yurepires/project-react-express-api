import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())
const port = 8010

app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
    }else{
        users = await prisma.user.findMany()
    }
    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:"+port+"/usuarios")
})

/*
    Criar API de usuários
    - criar um usuário
    - listar todos os usuários
    - editar um usuário
    - deletar usuário
*/