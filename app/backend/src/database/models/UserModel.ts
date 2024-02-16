import { IUser } from '../../Interfaces/users/IUser';
import IUserModel from '../../Interfaces/users/IUserModel';
import SequelizeUser from './SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(email: string, _password: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({
      where: { email },
    });

    console.log(' TESTANDO ', dbData);

    // if (dbData == null) return null;

    return dbData;
  }
}
