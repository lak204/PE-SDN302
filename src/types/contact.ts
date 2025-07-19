export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  group?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactData {
  name: string;
  email: string;
  phone?: string;
  group?: string;
}

export interface UpdateContactData {
  name: string;
  email: string;
  phone?: string;
  group?: string;
}
