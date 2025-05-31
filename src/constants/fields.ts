import type { FormField } from "../types";

export const formFields: FormField[] = [
  { key: "name", label: "Имя", required: true, validateAs: "text" },
  { key: "surname", label: "Фамилия", required: true, validateAs: "text" },
  { key: "email", label: "Email", required: true, validateAs: "email" },
  { key: "age", label: "Возраст", required: true, validateAs: "number" },
  { key: "city", label: "Город", required: true, validateAs: "text" },
  { key: "country", label: "Страна", required: true, validateAs: "text" },
];
