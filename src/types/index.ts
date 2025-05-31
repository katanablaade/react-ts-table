export type RecordItem = {
  id: string;
  name: string;
  email: string;
  age: string;
  city: string;
  country: string;
  [key: string]: string | number | boolean | Date | null | undefined;
};
export type FormField = {
  key: string;
  label: string;
  required?: boolean;
  validateAs?: "email" | "number" | "text";
};
