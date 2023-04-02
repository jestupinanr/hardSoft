export interface StatusResource {
  id: string;
  name: string;
}
export interface BrandsResource {
  id: string;
  name: string;
}

export interface TypesResource {
  id: string;
  name: string;
}

export interface Hardware {
  id: string,
  create_at: string,
  update_at: string,
  name: string,
  brand: BrandsResource,
  model: string,
  type: TypesResource,
  observations: string,
  acquisitionDate: string,
  status: StatusResource
}

export interface CreateHardware extends Omit<Hardware, 'status' | 'create_at' | 'update_at' | 'id'> {
  status: string
}


export interface Software {
  id: string,
  create_at: string,
  update_at: string,
  name: string,
  brand: BrandsResource,
  licenseNumber: string,
  type: TypesResource,
  observations: string,
  acquisitionDate: string,
  status: StatusResource
}

export interface CreateSoftware extends Omit<Software, 'status' | 'create_at' | 'update_at' | 'id'> {
  status: string
}

export interface Resources  {
  id: string,
  create_at: string,
  update_at: string,
  isAssigned: number,
  hardware: Hardware | null
  software: Software | null
}

export interface searchResource {
  letter: string;
  resources: Resources[];
}
