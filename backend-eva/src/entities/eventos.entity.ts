import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
  Check,
} from 'typeorm';

@Entity({ name: 'eventos' })
@Check(`"estado" IN ('ACTIVO', 'CERRADO')`)
export class Eventos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  titulo: string;

  @Column({ type: 'date', nullable: false })
  fevento: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacion: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'ACTIVO',
  })
  estado: string;

  @Column({
    type: 'timestamp',
    default: () => '2999-12-31 00:00:00',
  })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;

  @VersionColumn({ default: 0 })
  version: number;
}
