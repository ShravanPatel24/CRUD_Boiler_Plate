import { Inject, Injectable } from '@nestjs/common'
import { AppLoggerService, IRequestHandler, RecordIdModel, Result, UniqueEntityID } from '@softobiz-df/shared-lib'
import { query } from 'express'
import { User } from 'src/domain/user'
import { IUserRepository } from 'src/infrastructure/data-access/irepositories'
import { UserErrors } from '../../user.error'
import { DeleteUserCommand } from './delete-user.cmd'
import { DeleteUserResponseType } from './delete-user.response.type'

@Injectable()
export class DeleteUserCommandHandler implements IRequestHandler<DeleteUserCommand, DeleteUserResponseType> {
	private readonly _logger = AppLoggerService.getLogger(DeleteUserCommandHandler)

	constructor(@Inject(IUserRepository) private readonly _userRepo: IUserRepository) {}
	async handle(query: DeleteUserCommand, _token?: string): Promise<DeleteUserResponseType> {
		const user: Result<User> = await this._userRepo.findById(query.id)
		const userValue = user.getValue()
		console.log(userValue)

		await this._userRepo.remove(userValue)
		return Result.ok(new RecordIdModel({ id: userValue.id.toString() }))
	}
}
