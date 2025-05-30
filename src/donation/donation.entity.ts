import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Charity } from 'src/charity/charity.entity';
import { Category } from 'src/category/category.entity';
import { Donor } from 'src/donor/donor.entity';
@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quality: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  imgsUrl: string[];

  @Column({ type: 'text', array: true, nullable: true })
  imgsId: string[];

  @ManyToOne(() => Charity, { eager: true })
  @JoinColumn({ name: 'charityId' })
  charity: Charity;

  // you don't have to add this line ammar
  // @Column()
  // charityId: number;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  // make this connected with the donor not the user
  // @ManyToOne(() => User, { eager: true, nullable: false, onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  // user: User;
  @ManyToOne(() => Donor, { eager: true, nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'donorId' })
  donor: Donor;

  // also no need for this amman
  // @Column({ nullable: true })
  // userId: number;
}
