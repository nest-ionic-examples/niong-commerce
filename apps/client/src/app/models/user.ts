// import { MatxGmapAddress } from "angular-material-extended/matx-gmap";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  address: any | {
    address?: string,
    coordinates?: {
      latitude: number,
      longitude: number,
    }
  };
  created: Date;
  enabled: boolean;
  deleted: boolean;
}
