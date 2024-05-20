//Paciência e uma boa prova. Que a Força esteja com você!
import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.
import { createServer } from 'node:http';
import { writeData, readData } from './controller.js';

const PORT = 3600

const server = createServer((req, res) => {})

server.listen(PORT, () => {
  console.clear()
  console.log('=:=:=:= ConnectPeople API =:=:=:= \n')
  console.log(`Where your info is always in hand! 🙂 \nServer running on PORT: ${PORT} 🚀 \n`)
})