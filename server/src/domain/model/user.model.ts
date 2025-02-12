export type UserModelProps = {
  id: number;
  email: string;
  password: string | null;
  name: string;
  loginType: 'email' | 'kakao' | 'google';
  role: 'ADMIN' | 'USER';
  description: string | null;
  isVerified: boolean;
  imageUri: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export class UserModel {
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

  constructor(props: UserModelProps) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
    this.loginType = props.loginType;
    this.role = props.role;
    this.description = props.description;
    this.isVerified = props.isVerified;
    this.imageUri = props.imageUri;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static from(user: UserModelProps): UserModel {
    return new UserModel(user);
  }
}
