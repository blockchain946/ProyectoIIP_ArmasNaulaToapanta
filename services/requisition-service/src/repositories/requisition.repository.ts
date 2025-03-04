import { Pool } from 'pg';
import { Requisition } from '../models/requisition.model';

export class RequisitionRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER || 'recruitment',
      password: process.env.POSTGRES_PASSWORD || 'recruitment123',
      host: process.env.POSTGRES_HOST || 'postgres',
      database: process.env.POSTGRES_DB || 'recruitment',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });
  }

  async create(data: Partial<Requisition>): Promise<Requisition> {
    const query = `
      INSERT INTO requisitions (position, department, salary, requirements, functions, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      data.position,
      data.department,
      data.salary,
      data.requirements,
      data.functions,
      'PENDING'
    ];

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findById(id: string): Promise<Requisition | null> {
    const query = 'SELECT * FROM requisitions WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async updateStatus(id: string, status: string, comments?: string): Promise<Requisition> {
    const query = `
      UPDATE requisitions 
      SET status = $1, comments = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;
    
    const result = await this.pool.query(query, [status, comments, id]);
    return result.rows[0];
  }
} 