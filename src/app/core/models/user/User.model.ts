export interface User {
  id: string,
  create_at: string,
  update_at: string,
  nit: string,
  name: string,
  lastName: string,
  email: string,
  phone1: string,
  phone2: string,
  address: string,
  bornDate: string
  role: Rol,
  picture: string
}

export interface CreateUser extends Omit<User, 'id' | 'create_at' | 'update_at' > {
  password?: string
}

export interface Rol {
  id: string;
  name: string;
  create_at: string;
  update_at: string;
}

export interface SearchUser {
  letter: string;
  user: User[];
}
