import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ){}

  findAll(){
    return this.prisma.user.findMany();
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
