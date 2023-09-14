export type Player = {
    id: number,
    nick: string,
    name: string,
    email: string,
    password: string,
    avatarUrl: string,
    description: string,
    birthday: Date,
    createdAt: Date,
    updatedAt: Date
};

export type CreatePlayer = Omit<Player, "id" | "createdAt" | "updatedAt">;