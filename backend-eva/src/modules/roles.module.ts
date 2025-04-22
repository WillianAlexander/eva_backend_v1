import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from 'src/controllers/roles.controller';
import { Roles } from 'src/entities/roles.entity';
import { RolesService } from 'src/services/roles.service';

@Module({
  controllers: [RolesController],
  exports: [RolesService],
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesService],
})
export class RolesModule {}
