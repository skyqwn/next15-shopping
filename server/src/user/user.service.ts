import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async updateMyProfile(
    { description, name, profileImageUris }: UpdateUserDto,
    userId: number,
  ) {
    try {
      console.log('description', description);
      const newProfile = await this.db
        .update(users)
        .set({
          name,
          description,
          imageUri: profileImageUris,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId))
        .returning();
      return;
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkIsAdmin(userId: number) {
    try {
      const checkedUser = await this.db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .execute();

      if (checkedUser.length === 0) {
        throw new Error('User not found');
      }

      if (checkedUser[0].role === 'ADMIN') {
        return { success: true, result: false, data: checkedUser[0] };
      } else {
        return { success: false, result: false };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
