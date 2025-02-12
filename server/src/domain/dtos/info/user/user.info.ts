import { UserModel } from 'src/domain/model/user.model';

export type UserInfoProps = Omit<UserModel, 'password'>;

export class UserInfo {
  readonly id: number;
  readonly email: string;
  readonly password: string | null;
  readonly name: string;
  readonly loginType: 'email' | 'kakao' | 'google';
  readonly role: 'ADMIN' | 'USER';
  readonly description: string | null;
  readonly isVerified: boolean;
  readonly imageUri: string | null;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;

  constructor(props: UserInfoProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.role = props.role;
    this.loginType = props.loginType;
    this.isVerified = props.isVerified;
    this.description = props.description;
    this.imageUri = props.imageUri;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static from(domain: UserModel): UserInfo {
    return new UserInfo({
      id: domain.id,
      createdAt: domain.createdAt,
      deletedAt: domain.deletedAt,
      description: domain.description,
      email: domain.email,
      imageUri: domain.imageUri,
      isVerified: domain.isVerified,
      loginType: domain.loginType,
      name: domain.name,
      role: domain.role,
      updatedAt: domain.updatedAt,
    });
  }
}
