import { Charity } from 'src/charity/charity.entity';
import { Volunteer } from 'src/volunteer/volunteer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => Charity, (charity: Charity) => charity.events, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  charity: Charity;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.event, { eager: true })
  volunteers: Volunteer[];

  @Column({ type: 'text', array: true, nullable: true })
  imgsUrl: string[];

  @Column({ type: 'text', array: true, nullable: true })
  imgsId: string[];

  // so we can archive events later
  @Column({ type: 'boolean', default: false })
  finished: boolean;
}
