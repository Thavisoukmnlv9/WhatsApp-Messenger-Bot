/* eslint-disable @typescript-eslint/naming-convention */
import { type Actions, type Role, type Subjects } from "./interface";

export const rolePermissions: Record<Role, Array<{ action: Actions; subject: Subjects | Subjects[] }>> = {
  ADMIN: [{ action: "manage", subject: "all" }],
  CUSTOMER: [

  ],
};
