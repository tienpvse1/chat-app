import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../../base/entity.base';

@Entity()
@Unique('email_unique_key', ['email'])
@Unique('username_unique_key', ['username'])
export class User extends BaseEntity {
  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  name: string;
  @Column({ name: 'custom_data', nullable: true, type: 'jsonb' })
  customData: object;
}
