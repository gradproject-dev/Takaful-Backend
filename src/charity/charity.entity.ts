import { Donation } from 'src/donation/donation.entity';
import { EventEntity } from 'src/event/event.entity';
import { Transaction } from 'src/transactions/transaction.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CHARITY_STATUS } from './enums';

@Entity()
export class Charity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // @Column()
  // address: string;
  @Column({ nullable: true })
  lng: string;
  @Column({ nullable: true })
  lat: string;

  // for soft deletions
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @Column()
  imgUrl: string;

  @Column()
  imgId: string;

  // ramez
  @Column({ type: 'text', array: true, nullable: true })
  docsUrl: string[];

  @Column({ type: 'text', array: true, nullable: true })
  docsId: string[];

  // make this connnected to the
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Donation, (donation: Donation) => donation.charity, {
    onDelete: 'CASCADE',
  })
  donation: Donation;

  @OneToMany(() => EventEntity, (event: EventEntity) => event.charity)
  events: EventEntity[];

  @OneToMany(() => Transaction, (tx) => tx.charity)
  transactions: Transaction[];

  @Column({ default: false })
  canReceiveFunds: boolean;

  @Column({
    type: 'enum',
    default: CHARITY_STATUS.PENDING,
    enum: CHARITY_STATUS,
  })
  status: CHARITY_STATUS;
}
