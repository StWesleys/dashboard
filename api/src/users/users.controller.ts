import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ){}

  @Get()
  findAll(){
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto){
    return this.usersService.create(body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.usersService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserDto
  ){
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
    return this.usersService.remove(id);
  }
}
