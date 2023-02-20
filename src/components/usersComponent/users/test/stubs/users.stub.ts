import { Users } from '../../models/users.model';
import { ROLES } from '../../../../../constants/roles.constants';

export const usersStub = (): Users => {
  return <Users>{
    id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    email: 'test@example.com',
    password: 'Qwerty12345!',
    roles: [
      {
        id: 1,
        name: ROLES.ADMIN,
      },
      {
        id: 2,
        name: ROLES.USER,
      },
    ],
  };
};
