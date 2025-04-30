export type Response<T> = {
  result: boolean;
  errorCode: string;
  message?: string;
  data?: T;
}
export interface ListData {
  name: string;
  link: string;
  describe: string;
}