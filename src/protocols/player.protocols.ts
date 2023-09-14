import { Dayjs } from "dayjs";

export type Player = {
    id: number,
    nick: string,
    name: string,
    email: string,
    password: string,
    avatarUrl: string,
    description: string,
    birthday: Date | Dayjs,
    createdAt: Date | Dayjs,
    updatedAt: Date | Dayjs
};

export type CreatePlayer = Omit<Player, "id" | "createdAt" | "updatedAt">;