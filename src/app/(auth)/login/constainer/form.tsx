"use client";
import { Button } from "@/components/containers/button";
import { Form } from "@/components/containers/form";
import { hookLoginForm } from "./hook";
export function LoginForm() {
  const { form, onSubmit, isLoading } = hookLoginForm();
  return (
    <div>
      <Form formInstance={form} onSubmit={onSubmit} showButton={false} className="m-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight font-noto-lao">
            ເຂົ້າລະບົບ
          </h1>
          <p className="text-sm text-muted-foreground font-noto-lao">
            ປ້ອນບັນຊີເຂົ້າໃຊ້ງານລະບົບແລະລະຫັດຜ່ານຂອງທ່ານຂ້າງລຸ່ມນີ້ <br />
            ເພື່ອເຂົ້າສູ່ບັນຊີຂອງທ່ານ
          </p>
        </div>
        <div className="grid gap-2">
          <Form.Field name="username" control={form.control} label="ບັນຊີເຂົ້າໃຊ້ງານລະບົບ">
            <Form.Input.Input placeholder="59684710" />
          </Form.Field>
          <Form.Field name="password" control={form.control} label="ລະຫັດຜ່ານ">
            <Form.Input.Password />
          </Form.Field>
          {form.formState.errors.root && (
            <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
          )}
        </div>
        <Button className="mt-2 w-full" loading={isLoading}>
          ເຂົ້າສູ່ລະບົບ
        </Button>
      </Form >
    </div>
  );
}