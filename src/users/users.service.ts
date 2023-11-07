import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import usersModel from "src/auth/models/users.model";
import message from "src/utils/messages";

@Injectable()
export class UsersService {
	private logger = new Logger(UsersService.name);
	async findAll() {
		try {
			const users = await usersModel.find({ isDeleted: false });
			return {
				error: false,
				message: message.USER_GET_SUCCESS,
				users,
			};
		} catch (error) {
			return new InternalServerErrorException({ errMsg: error.message });
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
