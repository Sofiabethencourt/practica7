import { AppConfig } from "../clases/AppConfig.js";

/**
 * Interfaz que declara los métodos publicos de la clase AppCOnfig
 */
export interface IAppConfig {
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    getAll(): Map<string, string>;
    reset(): void;
    loadProfile(profile:"development" | "production"): void;
}