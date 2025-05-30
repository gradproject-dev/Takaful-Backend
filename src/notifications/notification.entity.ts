import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Donor } from 'src/donor/donor.entity';
import { Charity } from 'src/charity/charity.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  // @ManyToOne(() => Donor, { nullable: true })
  // donor: Donor;

  // @ManyToOne(() => Charity, { nullable: true })
  // charity: Charity;

  @ManyToOne(() => User, { nullable: true })
  from: User;

  @ManyToOne(() => User, { nullable: true })
  to: User;

  @Column()
  recipientExpoPushToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
