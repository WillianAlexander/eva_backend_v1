import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'participantes' })
export class Participantes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 50 })
  correo: string;

  @Column({ type: 'int' })
  departamento_id: number;

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
