db = new Mongo().getDB('plataforma-integracao');

db.createCollection('responsavel', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        nome: {
          bsonType: 'string',
          description: 'Nome do usuário',
        },
        cpf: {
          bsonType: 'string',
          description: 'CPF',
        },
        dataCriacao: {
          bsonType: 'date',
          description: 'Data de criação do registro',
        },
        dataAlteracao: {
          bsonType: 'date',
          description: 'Data de alteração do registro',
        },
      },
    },
  },
});
