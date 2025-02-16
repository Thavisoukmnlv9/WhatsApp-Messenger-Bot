import { type MongoAbility } from "@casl/ability";

export type Role = "ADMIN" | "CUSTOMER"

export type Actions = "create" | "read" | "update" | "delete" | "manage";

export type Subjects =
  | "all"
  | "user"

export type AppAbility = MongoAbility<[Actions, Subjects]>;
