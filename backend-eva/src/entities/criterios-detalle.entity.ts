import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'criterios_detalle' })
export class CriteriosDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descripcion: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => '2999-12-31 00:00:00',
  })
  fhasta: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fdesde: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  version: number;
}
