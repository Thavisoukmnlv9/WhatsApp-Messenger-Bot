'use client';
import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { IBotCreateSchema } from "./schema";

const formTitle = "Create a New Bot";
const formSubtitle = "Fill in the details below to set up your bot.";

interface BotFormProps {
  form: UseFormReturn<IBotCreateSchema>;
  onSubmit: (data: IBotCreateSchema) => Promise<void>;
  isEdit?: boolean;
}

export const BotForm: React.FC<BotFormProps> = ({ form, onSubmit }) => {
  const { errors } = form.formState;
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="name" control={form.control} label="Bot Name" description="A unique name for your bot">
          <Form.Input.Input placeholder="Enter bot name..." />
        </Form.Field>
        <Form.Field name="number" control={form.control} label="Bot ID" description="A unique identifier for the bot">
          <Form.Input.Input placeholder="e.g., BOT-1234" />
        </Form.Field>
        <div>
          <Form.Field name="description" control={form.control} label="Bot Description" description="Short description of the bot">
            <Form.Input.Textarea placeholder="Provide a brief description..." />
          </Form.Field>
          <Form.Field name="phone" control={form.control} label="Phone Number" description="Associated contact number">
            <Form.Input.Input placeholder="e.g., +856 20 59684710" />
          </Form.Field>
          <Form.Field name="status" control={form.control} label="Status (Active)" required={false}>
            <Form.Input.Switch />
          </Form.Field>
        </div>
      </div>
      {errors?.root?.message && (
        <p className="text-red-600 text-sm">{errors.root.message}</p>
      )}
    </Form>
  );
};
