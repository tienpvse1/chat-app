import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

enum Emoji {
  HEART = ':heart',
  SMILEY = ':smiley',
  SAD = ':sad',
  ANGRY = ':angry',
  HAPPY = ':happy',
}

@Entity()
export class Message extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'enum', enum: Emoji })
  emoji: Emoji;
}
