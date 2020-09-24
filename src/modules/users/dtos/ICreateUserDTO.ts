export default interface ICreateUserDTO {
  login: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}
