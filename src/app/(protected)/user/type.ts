import { type IOffice } from "../office/type";

export type RoleType = "ADMIN" | "FINANCE" | "POLICE_OFFICER" | "POLICE_COMMANDER" | "POLICE_PRODUCTION";

export interface IUser {
    no: number;
    id: number;
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: RoleType;
    officeId: number;
    office: IOffice;
    branchRole: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
