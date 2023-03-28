import { AppError, RecordIdModel, Result } from '@softobiz-df/shared-lib'

export type DeleteUserResponseType = Result<RecordIdModel | AppError>
