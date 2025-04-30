import {
  Column,
  Entity,
  PrimaryColumn,
  VersionColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Departamentos } from './departamentos.entity';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryColumn({ unique: true })
  usuario: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  identificacion: string;

  @Column()
  correo: string;

  @Column({ nullable: true, default: 2 })
  rol_id: number;

  @Column({ nullable: true, unique: true })
  departamento_id: number;

  @ManyToOne(() => Departamentos, (departamento) => departamento.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamento: Departamentos;

  @Column({ type: 'varchar', default: 'ACT' })
  estado_usuario: string;

  @PrimaryColumn({ type: 'timestamp', default: () => '2999-12-31 00:00:00' })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;

  @VersionColumn({ default: 0 })
  version: number;
}
