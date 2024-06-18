import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async read() {
    return { user: [] };
  }

  @Get(':id')
  async readOne(@Param() param) {
    return { user: {}, param };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUserDTO,
    @Param() param,
  ) {
    return {
      method: 'put',
      email,
      name,
      password,
      param,
    };
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdateUserDTO,
    @Param() param,
  ) {
    return {
      method: 'put',
      email,
      name,
      password,
      param,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
