import { Request, Response } from 'express';
import { Producer } from 'kafkajs';
import { RequisitionRepository } from '../repositories/requisition.repository';
import { KafkaTopics } from '../types/kafka-topics';

export class RequisitionController {
  constructor(
    private repository: RequisitionRepository,
    private producer: Producer
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const requisition = await this.repository.create(req.body);
      
      // Publicar evento
      await this.producer.send({
        topic: KafkaTopics.REQUISITION_CREATED,
        messages: [{ value: JSON.stringify(requisition) }],
      });

      res.status(201).json(requisition);
    } catch (error) {
      res.status(500).json({ error: 'Error creating requisition' });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const requisition = await this.repository.findById(req.params.id);
      if (!requisition) {
        res.status(404).json({ error: 'Requisition not found' });
        return;
      }
      res.json(requisition);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching requisition' });
    }
  };

  review = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status, comments } = req.body;
      
      const requisition = await this.repository.updateStatus(id, status, comments);
      
      // Publicar evento
      await this.producer.send({
        topic: KafkaTopics.REQUISITION_APPROVED,
        messages: [{ value: JSON.stringify(requisition) }],
      });

      res.json(requisition);
    } catch (error) {
      res.status(500).json({ error: 'Error reviewing requisition' });
    }
  };
} 