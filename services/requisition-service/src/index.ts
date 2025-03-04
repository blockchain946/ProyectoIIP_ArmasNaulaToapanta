import express from 'express';
import { Kafka } from 'kafkajs';
import { RequisitionController } from './controllers/requisition.controller';
import { RequisitionRepository } from './repositories/requisition.repository';

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'requisition-service',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'requisition-group' });

const repository = new RequisitionRepository();
const controller = new RequisitionController(repository, producer);

// Rutas
app.post('/requisitions', controller.create);
app.get('/requisitions/:id', controller.getById);
app.put('/requisitions/:id/review', controller.review);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Requisition service running on port ${PORT}`);
}); 