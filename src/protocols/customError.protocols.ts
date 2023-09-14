export class CustomError extends Error {
    name: string;

    constructor(
        public message: string,
        public status: number
    ) {
        super();
    }
};