export interface IFormData {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  agree?: boolean;
  image?: string;
}

export interface BadResponse {
  errors: {
    'email or password': string;
  };
}
