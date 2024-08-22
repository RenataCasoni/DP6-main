import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('decks')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commanderName: string;

  @Column('json')
  cards: any[];
}
