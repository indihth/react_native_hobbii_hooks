export interface PatternType {
  _id: number;
  title: string;
  description: string;
  craft_type: string;
  suggested_yarn: string;
  yarn_weight: string;
  gauge: string;
  meterage: string;
  user: { id: number; full_name: string }; // object with id and full_name
  image_path: string[]; // array of strings
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}