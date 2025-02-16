import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReset } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import showToast from '@/components/containers/show-toast';
import { apiClient } from '@/lib/axios';
import { useOne } from '@/hooks/useOne';

import { type IBot } from "../type";
import { defaultValuesBot, formSchema, IBotCreateSchema } from '../container/schema';

export const useBotForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<IBotCreateSchema>({
    defaultValues: defaultValuesBot,
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: IBotCreateSchema) => {
    try {
      await apiClient.post<IBot>("/bot", { data });
      showToast({ type: "success", title: "Create bot successfully" });
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      form.reset();
      router.back();
    } catch(error) {
      const axiosError = error as { data: { message: string } };
      if (axiosError?.data?.message) {
        form.setError("root", { type: "manual", message: "Can not create bot" })
      }
    }
  };
  return { form, onSubmit };
};

export interface IBotData {
  status: string;
  result: IBot[];
}
export const useBotFormEdit = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IBot>({ resource: "bot", id });
  const bot = data?.result ?? null;
  const form = useForm<IBotCreateSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesBot,
  });
  useFormReset({ bot, loading, formReset: form.reset });
  const router = useRouter();
  const onSubmit = async (data: IBotCreateSchema) => {
    try {
      const resources = `/bot/${id}`
      await apiClient.post<IBot>(resources, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["bot"] });
      queryClient.invalidateQueries({ queryKey: [resources] });
      form.reset();
      router.back();
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  bot,
  loading,
  formReset,
}: {
  bot: IBot | null,
  loading: boolean,
  formReset: UseFormReset<IBotCreateSchema>
}) => {
  useEffect(() => {
    const shouldResetForm = bot && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<IBotCreateSchema> = {
      name: bot.name,
      number: bot.number,
      description: bot.description,
      phone: bot.phone,
      status: bot.status,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [bot, loading, formReset]);
};