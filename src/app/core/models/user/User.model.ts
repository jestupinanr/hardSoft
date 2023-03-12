export interface User {
  id: string;
  nit: string;
  name: string;
  lastName:string
  email: string;
  password: string;
  phone1: string;
  phone2: string;
  address: string;
  bornDate: Date
  role: Rol;
  createAt: string;
  updateAt: string;
}

export interface Rol {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
}
