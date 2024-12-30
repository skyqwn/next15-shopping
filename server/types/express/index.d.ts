interface UserProps {
  user: {
    id: number;
    email: string;
    password: string | null;
    loginType: 'email' | 'kakao' | 'google';
    name: string;
    isVerified: boolean;
    imageUri: string | null;
    kakaoImageUri: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}

declare global {
  namespace Express {
    interface User extends UserProps {
      accessToken: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
