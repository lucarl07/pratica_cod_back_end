//Paciência e uma boa prova. Que a Força esteja com você!
import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.
import { createServer } from 'node:http';
import { writeData, readData } from './controller.js';

const PORT = 3600

const server = createServer((req, res) => {
  // Obtendo o método e a URL da requisição:
  const { method, url } = req;

  // Função para o retorno dos dados em formato de string JSON
  const writeResponse = (status, resEnd = "", message = "Task finished successfully!") => {
    res.writeHead(status, { "Content-Type": "application/json" })
    res.end(JSON.stringify(resEnd))
    return console.log(message + '\n');
  }

  // Lendo o arquivo pessoas.json:
  readData((error, data) => {
    // Validando a leitura do arquivo:
    if (error) {
      return writeResponse(500, { 
        mensagem: "Erro ao ler os dados. Por favor, tente novamente." 
      }, 'An error ocurred while reading server data.');
    }

    // Declarando os endpoints:
    if (method === 'POST' && url === '/pessoas') { // Cadastro de Pessoa
      console.log(`${method} ${url}`)

      let body = "";

      req.on('data', (chunk) => { body += chunk });
      req.on('end', () => {
        const newUser = JSON.parse(body)

        if (!Object.hasOwn(newUser, "nome") || !Object.hasOwn(newUser, "idade") || !Object.hasOwn(newUser, "email")) {
          return writeResponse(400, { 
            mensagem: "Dados insuficientes foram fornecidos; verifique se você digitou seu nome, idade e/ou e-mail." 
          }, 'Bad request: lacks obligatory data.');
        } else if (data.some((user) => user.email === newUser.email)) {
          return writeResponse(403, { 
            mensagem: "O e-mail utilizado já está associado a uma conta. Tente fazer login ou use outra credencial." 
          }, 'Unauthorized: a matching value with an already existing unique identifier was found.');
        }
        
        newUser.id = uuidv4();
        data.push(newUser);

        writeData(data, (err) => {
          if (err) {
            return writeResponse(500, { 
              mensagem: "Erro ao adicionar dados. Por favor, tente novamente." 
            }, 'An error ocurred while writing new data.');
          }

          writeResponse(201, {
            mensagem: "Requisição finalizada com sucesso!",
            usuario: newUser
          });
        })
      })

    } else if (PORT) {
      console.log(`${method} ${url}`)
    } else if (PORT) {
      console.log(`${method} ${url}`)
    } else if (PORT) {
      console.log(`${method} ${url}`)
    } else if (PORT) {
      console.log(`${method} ${url}`)
    } else {
      writeResponse(404, {
        mensagem: "A rota não foi encontrada ou é inexistente."
      }, `Endpoint ${method} ${url} not found.`)
    }
  })
})

server.listen(PORT, () => {
  console.clear()
  console.log('=:=:=:= ConnectPeople API =:=:=:= \n')
  console.log(`Where your info is always in hand! 😉 \nServer running on PORT: ${PORT} 🚀 \n`)
})