import { Inject, Injectable } from '@nestjs/common'
import { AppLoggerService, IRequestHandler, RecordIdModel, Result } from '@softobiz-df/shared-lib'
import { User } from 'src/domain/user'
import { IUserRepository } from 'src/infrastructure/data-access/irepositories'
import { UpdateUserCommand } from './update-user.cmd'
import { UpdateUserResponseType } from './update-user.response.type'

@Injectable()
export class UpdateUserCommandHandler implements IRequestHandler<UpdateUserCommand, UpdateUserResponseType> {
	private readonly _logger = AppLoggerService.getLogger(UpdateUserCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}
	async handle(commandOrQuery: UpdateUserCommand, token?: string): Promise<UpdateUserResponseType> {
		const users: Result<User> = await this._userRepo.findById(commandOrQuery.id)
		const userValue = users.getValue()
		console.log(userValue)

		const updateUser = User.create(
			{
				firstName: commandOrQuery.firstName,
				lastName: '',
				email: '',
			},
			userValue.id,
		)

		if (updateUser.isFailure) return Result.fail(updateUser.errorValue())

		const updateUserValue = updateUser.getValue()
		console.log(updateUserValue)
		await this._userRepo.save(updateUserValue)
		return Result.ok(new RecordIdModel({ id: updateUserValue.id.toString() }))
	}
}
