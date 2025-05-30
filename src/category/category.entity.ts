import { Donation } from 'src/donation/donation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Donation, (donation: Donation) => donation.category)
  donation: Donation;
}
