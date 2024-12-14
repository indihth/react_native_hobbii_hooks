// For filling out a form that uses Pattern type but has no id yet
// export interface PatternType {
//   // _id: number;
//   title: string;
//   description: string;
//   craft_type: string;
//   suggested_yarn: string;
//   yarn_weight: string;
//   gauge: string;
//   meterage: string;
//   user: { id: number; full_name: string }; // object with id and full_name
//   image_path: string[]; // array of strings
//   deleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface PatternTypeID extends PatternType {
//   _id: number;
// }
export interface IAuthContext {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

export type IResponseType = PatternTypeID;

// For filling out a form that uses Pattern type but has no id yet
export interface PatternType {
    title: string;
    description: string;
    craft_type: string;
    suggested_yarn?: string;
    yarn_weight?: string;
    gauge?: string;
    meterage?: number;
    user?: { id: number; full_name: string }; // object with id and full_name
    image_path?: string[]; // array of strings
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface PatternTypeID extends PatternType {
    _id: string;
  }

export interface YarnType {
    title: string;
    description: string;
    company_name: string;
  }
  
  export interface YarnTypeID extends PatternType {
    _id: string;
  }

  
