import { type RegisterOptions } from "react-hook-form";
import type { FormField } from "../types";

export const useValidationRules = (formField: FormField) => {
  const rules: RegisterOptions = {};

  if (formField.required) {
    rules.required = `${formField.label} обязательно`;
  }

  if (formField.validateAs === "email") {
    rules.pattern = {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "Некорректный email",
    };
  } else if (formField.validateAs === "number") {
    rules.pattern = {
      value: /^[0-9]+$/,
      message: "Только числа",
    };
  }

  rules.validate = {
    notEmpty: (value: string) =>
      formField.required && typeof value === "string" && value.trim() === ""
        ? `${formField.label} не должно быть пустым`
        : true,
  };

  return rules;
};
