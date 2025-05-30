import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Donor } from 'src/donor/donor.entity';
import { EventEntity } from 'src/event/event.entity';

@Entity()
export class Volunteer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Donor, (donor) => donor.volunteers, { onDelete: 'CASCADE' })
  donor: Donor;

  @ManyToOne(() => EventEntity, (event) => event.volunteers, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;

  // Optional: Add more fields like role, status, notes, etc.
  // @Column({ type: 'varchar', length: 100, nullable: true })
  // role: string;

  // this should be an enum ["ACCEPTED","IDLE","REJECTED"]
  @Column()
  status: string;
}

// make charity be able to cahnge status about volunteer
