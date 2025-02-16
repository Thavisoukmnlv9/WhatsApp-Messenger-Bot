"use client";

import { BotForm } from "../../container/form";
import { useBotFormEdit } from "../../hook/useForm";

export default function BotEdit({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useBotFormEdit({ id: Number(params.id) });
  return (
    <BotForm form={form} onSubmit={onSubmit} isEdit />
  );
}
