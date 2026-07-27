export interface IResponse<T = any, E = any> {
  status: boolean;
  message: string;
  data?: T;
  errorCode: number;
  errors?: E;
}
