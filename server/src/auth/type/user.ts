export interface UserProps {
  id: number;
  email: string;
  password: string;
  loginType: string;
  name: string;
  isVerified: boolean;
  imageUri: string | null;
  kakaoImageUri: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
