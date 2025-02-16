import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { defaultValues, userSchemaEdit } from "../container/form/schema";
import { type IUser } from "../type";

export interface IUserData {
  role: string;
  result: IUser;
}
export const useUserEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading } = useOneUser({ id });
  const form = useForm<z.infer<typeof userSchemaEdit>>({
    resolver: zodResolver(userSchemaEdit),
    defaultValues,
  });
  useFormReset({ user, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof userSchemaEdit>) => {
    try {
      await apiClient.put<IUser>(`/user/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useOneUser = ({ id }: { id: number }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IUserData>(`user/${id}`, { signal });
        setUser(response?.result ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { user, loading };
};

const useFormReset = ({
  user,
  loading,
  formReset,
}: {
  user: IUser | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof userSchemaEdit>>
}) => {
  useEffect(() => {
    const formValues: Partial<z.infer<typeof userSchemaEdit>> = {
      role: user?.role,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      isActive: user?.isActive,
      officeId: user?.officeId ?? undefined,
      username: user?.username,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [user, loading, formReset]);
};

