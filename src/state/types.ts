export enum AsyncState {
  DEFAULT = 'DEFAULT',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED'
}

export interface ErrorResponse {
  errorCode: string,
  message: string
}