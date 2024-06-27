import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async getOne(id: string) {
    await this.existUser(id);
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update({ name, email, password }: UpdateUserDTO, id: string) {
    await this.existUser(id);

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(data: UpdatePatchUserDTO, id: string) {
    await this.existUser(id);

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.existUser(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async existUser(id: string) {
    const exist = await this.prisma.user.count({
      where: {
        id,
      },
    });
    if (!exist) {
      throw new NotFoundException(`The user ${id} not exist`);
    }
  }
}
