/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/containers/form";
import React from "react";

const formTitle = "ສ້າງຜູ້ໃຊ້ງານລະບົບ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບໃຫ້ຖ້ວນ";

const roleOptions = [
  { value: "ADMIN", label: "ແອັດມິນ" },
  { value: "FINANCE", label: "ທີມການເງິນ" },
  { value: "POLICE_OFFICER", label: "ທີມຕື່ມຟອມ" },
  { value: "POLICE_COMMANDER", label: "ທີມອະນຸມັດຟອມ" },
  { value: "POLICE_PRODUCTION", label: "ທີມຜະລິດ" },
];

const UserForm: React.FC<any> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="username" control={form.control} label="ຊື່ຜູ້ໃຊ້ງານລະບົບ" description="ຊື່ບັນຊີຜູ້ໃຊ້">
          <Form.Input.Input placeholder="Thavisouk " />
        </Form.Field>
        <Form.Field name="phone" control={form.control} label="ເບີໂທ" description="ເບີໂທນີ້ແມ່ນໃຊ້ເຂົ້າລະບົບ">
          <Form.Input.Input placeholder="59684710" />
        </Form.Field>
        <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" description="ຊື່ແທ້">
          <Form.Input.Input placeholder="Thavisouk " />
        </Form.Field>
        <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ" description="ນາມສະກຸນ">
          <Form.Input.Input placeholder="Manalavong" />
        </Form.Field>
        <Form.Field name="role" control={form.control} label="ສີດຜູ້ໃຊ້ງານລະບົບ" >
          <Form.Input.Select placeholder="ເລືອກສີດ" className="w-full" options={roleOptions} />
        </Form.Field>
        <Form.Field name="email" control={form.control} label="ອີເມລ" required={false}>
          <Form.Input.Input placeholder="Thavisoukmnlv@gmail.com" className="w-full" />
        </Form.Field>

        <div>
          <Form.Field name="password" control={form.control} label="ລະຫັດຜ່ານ">
            <Form.Input.Password />
          </Form.Field>
          <Form.Field name="isActive" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ" required={false}>
            <Form.Input.Switch />
          </Form.Field>
        </div>
      </div>
      {form.formState.errors.root && (
        <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
      )}
    </Form>
  );
};

export default UserForm;

