import { Donation } from 'src/donation/donation.entity';
import { Transaction } from 'src/transactions/transaction.entity';
import { User } from 'src/users/user.entity';
import { Volunteer } from 'src/volunteer/volunteer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  lng: string;

  @Column({ nullable: true })
  lat: string;

  // address: string;

  @Column({ nullable: true })
  imgId: string; // Add this field for storing the image ID

  @Column({ nullable: true })
  imgUrl: string; // Add this field for storing the image URL

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.donor)
  volunteers: Volunteer[];

  @OneToMany(() => Transaction, (tx) => tx.donor)
  transactions: Transaction[];
  @OneToMany(() => Donation, (dn) => dn.donor)
  donations: Donation[];
}
