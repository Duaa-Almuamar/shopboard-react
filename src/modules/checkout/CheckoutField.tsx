import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";

interface CheckoutFieldProps extends Pick<ComponentProps<"input">, "type" | "autoComplete"> {
  id: string;
  label: string;
  error: string | undefined;
  registration: UseFormRegisterReturn;
}

export default function CheckoutField({
  id,
  label,
  error,
  registration,
  ...inputProps
}: CheckoutFieldProps) {
  const isInvalid = error !== undefined;
  const errorId = `${id}-error`;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? errorId : undefined}
        {...inputProps}
        {...registration}
      />
      {isInvalid && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
}
