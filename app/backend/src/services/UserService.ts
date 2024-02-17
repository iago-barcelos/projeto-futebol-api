import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../database/models/UserModel';
import IUserModel from '../Interfaces/users/IUserModel';
import { TokenResponse } from '../Interfaces/users/IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async login(
    loginEmail: string,
    password: string,
  ): Promise<ServiceResponse<TokenResponse>> {
    const findUser = await this.userModel.login(loginEmail, password);

    if (!findUser) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const bcryptComparing = await bcrypt.compare(password, findUser.password);

    if (!bcryptComparing) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }

    const { id, email, role } = findUser;

    const token = jwt.sign({ id, email, role }, secret);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
