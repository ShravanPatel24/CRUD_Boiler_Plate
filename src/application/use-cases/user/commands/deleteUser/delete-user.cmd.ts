import { IRequest } from '@softobiz-df/shared-lib'
import { IsOptional } from 'class-validator'
import { DeleteUserResponseType } from './delete-user.response.type'
import { ApiProperty } from '@nestjs/swagger'

export class DeleteUserCommand implements IRequest<DeleteUserResponseType> {
	@IsOptional()
	@ApiProperty()
	public id: string

	public constructor(init?: Partial<DeleteUserCommand>) {
		Object.assign(this, init)
	}
}
