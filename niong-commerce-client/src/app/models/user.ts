export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  address: {
    addr1: string,
    addr2: string,
    city: string,
    state: string,
    country: string,
    zip: number,
  };
  created: Date;
  enabled: boolean;
  deleted: boolean;
}
