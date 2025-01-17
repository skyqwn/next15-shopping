import { CommonResponseType } from "./common";

export interface GetUserInfoResponseType extends CommonResponseType {
  data: UserInfoProps;
}

export interface UserInfoProps {
  createdAt: string;
  deletedAt: string | null;
  description: string;
  email: string;
  id: number;
  imageUri: string;
  isVerified: boolean;
  loginType: string;
  name: string;
  updatedAt: string;
}
