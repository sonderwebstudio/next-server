import { Injectable } from '@nestjs/common';
import { RolesService } from '../../usersComponent/roles/roles.service';
import { ROLES } from '../../../constants/roles.constants';
import { UsersService } from '../../usersComponent/users/users.service';
import { Users } from '../../usersComponent/users/models/users.model';
import { Roles } from '../../../components/usersComponent/roles/models/roles.model';
import { WeeksService } from '../../../components/lessonsComponent/weeks/weeks.service';
import { DaysService } from '../../../components/lessonsComponent/days/days.service';

@Injectable()
export class InitializerService {
  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private weeksService: WeeksService,
    private daysService: DaysService,
  ) {}

  async initialization() {
    await InitializerService.findOrCreateSimpleConstants([
      { service: this.rolesService, constants: ROLES },
    ]);

    await InitializerService.findOrCreateDifficultConstants([]);

    await this.findOrCreateAdminAccount();
    await this.findOrCreateUserAccount();
    await this.createWeeks();
    await this.createDays();
  }

  private static async findOrCreateSimpleConstants(data) {
    let constant;

    for (let i = 0; i < data.length; i++) {
      for (const key in data[i].constants) {
        constant = await this.getConstantByName(
          data[i].service,
          data[i].constants[key],
        );

        if (this.checkingForNull(constant)) {
          await this.createConstant(data[i].service, {
            name: data[i].constants[key],
          });
        }
      }
    }
  }

  private static async findOrCreateDifficultConstants(data) {
    let constant;

    for (let i = 0; i < data.length; i++) {
      for (const category in data[i].mainConstants) {
        for (const key in data[i].mainConstants[category]) {
          constant = await this.getConstantByName(
            data[i].mainService,
            data[i].mainConstants[category][key],
          );

          if (this.checkingForNull(constant)) {
            const obj = { name: data[i].mainConstants[category][key] };
            obj[data[i].foreignKey] = data[i].secondConstants[category];

            await this.createConstant(data[i].mainService, { ...obj });
          }
        }
      }
    }
  }

  private async createWeeks() {
    for (let i = 1; i <= 14; i++) {
      await this.weeksService.create({
        name: `Неделя ${i}`,
      });
    }
  }

  private async createDays() {
    const days = [
      'Грудь',
      'Пресс',
      'Спина',
      'Ноги',
      'Отдых',
      'Пресс BSU',
      'Кардио',
      'Все тело',
    ];
    for (let key of days) {
      await this.daysService.create({
        name: key,
      });
    }
  }

  private static async getConstantByName(service, name) {
    return service.findByName(name);
  }

  private static checkingForNull(constant) {
    return constant === null;
  }

  private static async createConstant(service, data) {
    service.create(data);
  }

  private static async findByEmail(email: string): Promise<Users> {
    const user = await Users.findOne({
      where: { email: email },
      include: { model: Roles },
    });

    return user;
  }

  private async findOrCreateAdminAccount() {
    const account = await InitializerService.findByEmail('admin@gmail.com');

    if (account === null) {
      const user: Users = await this.usersService.create({
        email: 'admin@gmail.com',
        password: 'adminAdmin',
      });

      await this.usersService.addRoleToUser({
        roleName: ROLES.ADMIN,
        userEmail: user.email,
      });
    }
  }

  private async findOrCreateUserAccount() {
    const account = await InitializerService.findByEmail('user@gmail.com');
    if (account === null) {
      await this.usersService.create({
        email: 'user@gmail.com',
        password: 'userUser',
      });
    }
  }
}
