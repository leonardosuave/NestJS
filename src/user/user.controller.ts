import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.UserService.create(data);
  }

  @Get()
  async read() {
    return this.UserService.list();
  }

  @Get(':id')
  async readOne(@Param() param) {
    const { id } = param;
    return this.UserService.getOne(id);
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.updatePartial({ email, name, password }, id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.UserService.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.UserService.delete(id);
  }
}
