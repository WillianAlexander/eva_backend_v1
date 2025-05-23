import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Roles } from './entities/roles.entity';
import { Departamentos } from './entities/departamentos.entity';
import { RolesModule } from './modules/roles.module';
import { DepartamentosModule } from './modules/departamentos.module';
import { ParticipantesModule } from './modules/participantes.module';
import { Participantes } from './entities/participantes.entity';
import { EventosModule } from './modules/eventos.module';
import { Eventos } from './entities/eventos.entity';
import { Evaluaciones } from './entities/evaluaciones.entity';
import { EvaluacionesModule } from './modules/evaluaciones.module';
import { EventoparticipantesModule } from './modules/eventoparticipantes.module';
import { EventoParticipantes } from './entities/eventoparticipantes.entity';
import { CriteriosDetalle } from './entities/criterios-detalle.entity';
import { CriteriosDetalleModule } from './modules/criterios_detalle.module';
import { AuthModule } from './modules/auth.module';
import { PdfModule } from './modules/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'EVA',
      schema: 'eva',
      entities: [
        Usuarios,
        Roles,
        Departamentos,
        Participantes,
        Eventos,
        Evaluaciones,
        EventoParticipantes,
        CriteriosDetalle,
      ],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsuariosModule,
    RolesModule,
    DepartamentosModule,
    ParticipantesModule,
    EventosModule,
    EvaluacionesModule,
    EventoparticipantesModule,
    CriteriosDetalleModule,
    AuthModule,
    PdfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
