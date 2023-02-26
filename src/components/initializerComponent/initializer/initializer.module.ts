import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InitializerService } from './initializer.service';
import { InitializerController } from './initializer.controller';
import { Roles } from '../../usersComponent/roles/models/roles.model';
import { Users } from '../../usersComponent/users/models/users.model';
import { RolesModule } from '../../usersComponent/roles/roles.module';
import { UsersModule } from '../../usersComponent/users/users.module';
import { Weeks } from '../../../components/lessonsComponent/weeks/models/weeks.model';
import { WeeksModule } from '../../../components/lessonsComponent/weeks/weeks.module';

@Module({
  providers: [InitializerService],
  controllers: [InitializerController],
  imports: [
    SequelizeModule.forFeature([Roles, Users, Weeks]),
    RolesModule,
    UsersModule,
    WeeksModule,
  ],
  exports: [SequelizeModule, InitializerService],
})
export class InitializerModule {}
