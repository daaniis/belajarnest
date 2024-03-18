import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const res = await this.usersRepository.insert(createUserDto);
    if (res['raw']['affectedRows'] > 0) {
      return {
        message: 'User berhasil ditambahkan',
        user: createUserDto,
      };
    } else {
      return {
        message: 'User tidak berhasil ditambahkan',
        user: {},
      };
    }
  }

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.usersRepository.update(id, updateUserDto);
    if (res['raw']['affectedRows'] > 0) {
      return {
        message: 'User berhasil diupdate',
        user: updateUserDto,
      };
    } else {
      return {
        message: 'Tidak ada user yang diupdate',
        user: {},
      };
    }
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
