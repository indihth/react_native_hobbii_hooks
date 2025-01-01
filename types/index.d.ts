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
  suggested_yarn?: SuggestedYarn;
  yarn_weight?: string;
  gauge?: string;
  meterage?: string;
  user?: { id: number; full_name: string }; // object with id and full_name
  image_path?: string[]; // array of strings
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatternTypeID extends PatternType {
  _id: string;
}

export interface YarnTypeID {
  _id: string;
  title: string;
  colorways: string[];
  weight?: string;
  meterage?: string;
  needle_size?: string;
  fibers?: FiberType[];
  description?: string;
  image_path?: string;
}

export interface SuggestedYarn {
  _id: string;
  title: string;
  colorways?: string[];
  fibers?: FiberType[];
}

export interface FiberType {
  fiber_name: string;
  percentage: number;
}

export interface UserType {
  _id: string;
  full_name: string;
  email?: string;
  image_path?: string;
  location?: string;
  about_me?: string;
  website_url?: string;
  portfolio_description?: string;
  favourite_patterns?: PatternTypeID[];
}

export interface ProjectsType {
  title: string;
  craft_type: string;
  patterns: PatternTypeID[];
  yarns_used: { yarn: string; colorway_name: string[] }[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsTypeID extends ProjectsType {
  _id: string;
}