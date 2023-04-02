import { Assigment } from "../assigment/Assigments.model"

export interface incident {
  id: string,
  create_at: string,
  update_at: string,
  description: string,
  assigment: Assigment,
  incidentStatus: statusIncident,
  solution: string | null,
  title: string
}

export interface statusIncident {
  id: string,
  create_at: string,
  update_at: string,
  name: string
}

export interface CreateIncident {
  title: string,
  assigment: string,
  incidentStatus: string,
  description: string,
  solution?: string
}

export interface SearchIncident {
  letter: string;
  incident: incident[];
}
