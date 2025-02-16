"use client";

import { BotForm } from "../container/form";
import { useBotForm } from "../hook/useForm";

export default function BotCreate() {
  const { form, onSubmit } = useBotForm();
  return (
    <>
      <BotForm form={form} onSubmit={onSubmit} />
    </>
  );
}
