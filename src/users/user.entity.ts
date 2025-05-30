import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from './types';
import { Charity } from 'src/charity/charity.entity';
import { Donor } from 'src/donor/donor.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ROLES,
  })
  role: ROLES;

  @OneToOne(() => Charity, (charity) => charity.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  charity: Charity;

  @OneToOne(() => Donor, (donor) => donor.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  donor: Donor;

  @Column({ nullable: true })
  expoPushToken: string;
}
