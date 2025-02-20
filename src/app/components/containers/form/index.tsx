import { Button, PasswordInput } from "@/components/containers";
import { cn } from "@/lib/utils";
import React from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FormUI, Input, Textarea } from "../../ui";
import { Combobox } from "./combobox";
import { DateTimePicker } from "./date-time-picker/date-time-picker";
import { FileInputField } from "./file-input";
import { FormField } from "./form-field";
import { Select } from "./select";
import { Switch } from "./switch";
import { ImageInput } from "./image-input";
import { ImageUploadMany } from "./image-input-many";
import { FileUpload } from "./file-upload";

interface FormProps<TVariables extends FieldValues = FieldValues> {
    formInstance: UseFormReturn<TVariables>;
    onSubmit: (data: TVariables) => void;
    saveButtonText?: string;
    children: React.ReactNode;
    subtitle?: string;
    title?: string;
    className?: string
    showButton?: boolean
}
export const Form = <TVariables extends FieldValues>({
  formInstance,
  onSubmit,
  saveButtonText = "ບັນທຶກ",
  children,
  title,
  subtitle,
  className,
  showButton = true,
}: FormProps<TVariables>) => {
  return (
    <FormUI {...formInstance} >
      <form
        onSubmit={formInstance.handleSubmit(onSubmit)}
        className={cn(
          "w-full mx-auto sm:max-w-full lg:max-w-full",
          className,
        )}
      >
        <Card className={cn(className)}>
          {title && (
            <CardHeader className="flex flex-col space-y-1.5 pt-6 px-6">
              <CardTitle className="text-2xl p-0 m-0">{title}</CardTitle>
              <CardDescription>
                {subtitle}
              </CardDescription>
            </CardHeader>
          )}
          <CardContent className="pt-6 space-y-4">{children}</CardContent>
          <CardFooter className="flex justify-end gap-x-4">
            {showButton && (
              <Button
                type="submit"
                loading={formInstance.formState.isSubmitting}
                disabled={formInstance.formState.isSubmitting}
              >{saveButtonText}</Button>
            )}

          </CardFooter>
        </Card>
      </form>
    </FormUI>
  );
};

Form.Field = FormField;
Form.Input = {
  Input,
  Select,
  DateTimePicker,
  Image: ImageInput,
  Switch,
  File: FileUpload,
  Combobox,
  Password: PasswordInput,
  Textarea,
  ImageUploadMany: ImageUploadMany
}
