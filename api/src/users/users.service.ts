import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ){}

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
  }){
    const { page, limit, search } = params;

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),

      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async create(data: CreateUserDto){
    return this.prisma.user.create({
      data,
    })
  }

  async findOne(id: number){
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if(!user){
      throw new NotFoundException('Usuário não encontrado');
    }

    return user
  }

  async update(id: number, data: CreateUserDto){
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async remove(id: number){
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    })
  }
}
