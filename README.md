# Primeira api

Implementação de uma Api básica para fins de aprendizado.

## Especificação

O desafio era criar uma API que eu pudesse salvar ativos da B3 com respectivos valores máximos e mínimos. Assim é possível fazer uma aplicação que consuma essa API monitorando os valores reais dos ativos da B3 e enviar um email de aviso caso o preço passe ácima do valor máximo ou abaixo do mínimo.

## Armazenamento dos dados

Para fins de aprendizado eu fiz 2 tipos de armazenamento. Utilizando o localRouts.js iremos salvar tudo em um arquivo JSON, já utilizando o routs.js foi utilizado uma imagem no docker do PostgreSQL.

## Instalando as dependências

Para instalar as dependências basta executar o comando abaixo:

```
npm install
```

## Executando

Para executar a API basta utilizar o comando:

```
npm start
```

obs: Para os comandos de POST, GET, PUT e DELETE, quando houver a palavra "local" estaremos lidando com os arquivos salvos em JSON. Quando não houver serão os do banco de dados.

### Cadastro de um ativo

**[POST]** http://localhost:3000/local/ativo
**[POST]** http://localhost:3000/ativo

Para o cadastro o corpo da requisição deve seguir o modelo do exemplo abaixo:

```
{
    "name": "ativo1",
    "max": 999
    "min": 1
}
```

### Listando todas as regras 

**[GET]** http://localhost:3000/local/ativo
**[GET]** http://localhost:3000/ativo

Esta requisição lista todas os ativos salvos, da forma como estão organizadas na base de dados. Um exemplo de retorno dessa requisição pode ser visto abaixo:

```
[
    {
        "id": 1
        "name": "ativo1",
        "max": 20,
        "min": 10
    }
    {
        "id": 2
        "name": "ativo2",
        "max": 30,
        "min": 10
    }
]

```

### Pegando um ativo específico pelo id

**[GET]** http://localhost:3000/local/ativo/:id
**[GET]** http://localhost:3000/ativo/:id

### Deletando uma regra cadastrada

**[DELETE]** http://localhost:3000/local/ativo/:id
**[DELETE]** http://localhost:3000/ativo/:id


Para realizar a remoção de um ativo, deve-se utilizar o identificador, o mesmo pode ser encontrado utilizando o GET visto anteriormente e assim substituindo no campo {id}.

### Alterando os valores de máximo e mínimo de um ativo já cadastrado.

**[PUT]** http://localhost:3000/local/ativo/:id
**[PUT]** http://localhost:3000/ativo/:id

O corpo da requisição deve seguir o modelo do exemplo abaixo:

```
{
    "max": 999
    "min": 1
}
```

Essa requisição irá alterar os valores de máximo e mínimo do ativo com identificador {id}.