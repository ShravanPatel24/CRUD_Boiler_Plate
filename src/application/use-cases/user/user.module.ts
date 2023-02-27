import { Module } from '@nestjs/common'
import { UserController } from 'src/application/rest-api/user.controller'
import { UserSqlRepositoryModule } from 'src/infrastructure/data-access/sql-repositories/user-sql-repository.module'
import { UserCreateCommand } from './commands/user/user.cmd'
import { UserCreateCommandHandler } from './commands/user/user.cmd.handler'
import { GetUserQuery } from './queries/user/user.query'
import { GetUserQueryHandler } from './queries/user/user.query.handler'
import { UpdateUserCommand } from './commands/updateUser/update-user.cmd'
import { UpdateUserCommandHandler } from './commands/updateUser/update-user.cmd.handler'

@Module({
	imports: [UserSqlRepositoryModule], // use MongoRepositoryModule if using Mongodb
	controllers: [UserController],
	providers: [
		{ provide: UserCreateCommand, useClass: UserCreateCommandHandler },
		{ provide: GetUserQuery, useClass: GetUserQueryHandler },
		{ provide: UpdateUserCommand, useClass: UpdateUserCommandHandler },
	],
})
export class UserModule {}
