import { ApolloServer } from 'apollo-server';
import { Kafka } from 'kafkajs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';

// Asegurarse que el archivo schema.graphql existe
const schemaPath = join(__dirname, 'schema', 'schema.graphql');
let typeDefs;

try {
  typeDefs = readFileSync(schemaPath, 'utf8');
} catch (error) {
  console.error('Error loading schema file:', error);
  process.exit(1);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      // Aquí puedes agregar contexto como autenticación
    };
  },
});

// Configurar Kafka usando la variable de entorno
const kafka = new Kafka({
  clientId: 'recruitment-app',
  brokers: ['localhost:29092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'recruitment-group' });

async function startServer() {
  try {
    // Iniciar Apollo Server primero
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);

    console.log('Connecting to Kafka...');
    await producer.connect();
    await consumer.connect();
    console.log('✅ Kafka connected successfully');

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer(); 