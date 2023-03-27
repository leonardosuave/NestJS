/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body) {
        return {body};
    }

    @Get()
    async read() {
        return { user: [] }
    }

    @Get(':id')
    async readOne(@Param() param) {
        return { user: {}, param }
    }

    @Patch(':id')
    async updatePartial(@Body() body, @Param() param) {
        return {
            method: 'put',
            body,
            param
        };
    }

    @Put(':id')
    async update(@Body() body, @Param() param) {
        return {
            method: 'put',
            body,
            param
        };
    }

    @Delete(':id')
    async delete(@Param() param) {
        return { param }
    }
}