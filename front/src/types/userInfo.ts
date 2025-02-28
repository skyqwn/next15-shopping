export interface GetUserInfoResponseType {
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
  role: string;
}
