import { Charity } from 'src/charity/charity.entity';
import { Donor } from 'src/donor/donor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PaymentMethod {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Donor, (donor) => donor.transactions, { eager: true })
  donor: Donor;

  @ManyToOne(() => Charity, (charity) => charity.transactions, { eager: true })
  charity: Charity;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  // ⚠️ For demo only — avoid in production
  @Column({ nullable: true })
  cardNumber: string;

  // ⚠️ For demo only — avoid in production
  @Column({ nullable: true })
  ccv: string;

  @CreateDateColumn()
  createdAt: Date;
}
