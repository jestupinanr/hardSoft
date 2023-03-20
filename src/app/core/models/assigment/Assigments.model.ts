import { Resources } from "../resource/Resource.model";
import { User } from "../user/User.model"

export interface Assigment {
  id: string,
  create_at: string,
  update_at: string,
  description: string,
  user: User,
  resource: Resources
}

export interface createrAssigment {
  user: string,
  resource: string;
  description: string
}

export interface SearchAssigment {
  letter: string;
  assigment: Assigment[];
}
