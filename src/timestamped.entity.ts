/* eslint-disable prettier/prettier */
import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export abstract class TimestampedEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}