import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryColumn()
  usuario: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  identificacion: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  rol_id: number;

  @PrimaryColumn({ type: 'timestamp', default: () => '2999-12-31 00:00:00' })
  fhasta: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fdesde: Date;

  @VersionColumn({ default: 0 })
  version: number;
}
