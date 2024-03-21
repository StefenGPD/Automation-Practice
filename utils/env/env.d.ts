export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: "dev" | "uat" | "stage",
            BASE_URL: string,
            EMAIL: string,
            PASSWORD: string,
        }
    }
}