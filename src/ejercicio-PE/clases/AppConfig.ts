import { IAppConfig } from "../interfaces/IAppConfig.js";

/**
 * Clase AppConfig que almacena una cofniguración enm tiempo de ejecución de las aplicaciones
 */
export class AppConfig implements IAppConfig{
    private static appConfig: AppConfig;
    private record: Map<string, string>;

    /**
     * Constructor de AppCOnfig
     */
    private constructor () {
        this.record = new Map();
    }

    /**
     * Método para obtener la instancia privada de la clase
     * @returns - Devuelve la instancia de la clase
     */
    public static getInstance(): AppConfig {
        if(!AppConfig.appConfig) AppConfig.appConfig = new AppConfig();
        return AppConfig.appConfig;
    }

    /**
     * Establece un nuevo par de clave-valor en el Map
     * @param key - Clave
     * @param value - Valor
     */
    public set(key: string, value: string): void {
        this.record.set(key, value);
    }

    /**
     * Función para obtener un valor a partir de una clave
     * @param key - Clave que insertas para obtener su valor
     * @returns El valor de la clave 
     */
    public get(key: string): string | undefined {
        return this.record.get(key);
    }

    /**
     * Función que devuelve una copia del mapa
     * @returns - una copia de todo el mapa de claves-valor
     */
    public getAll(): Map<string, string> {
        const copy: Map<string, string> = new Map();
        this.record.forEach((value, key) => {
            copy.set(key, value);
        });
        return copy;
    }

    /**
     * Limpia la configuración del mapa si existe la clave-valor env-test
     */
    public reset(): void {
        if (this.record.get("env") == "test") this.record.clear();
        else throw new Error ("reset() solo está permitido en entorno de pruebas"); 
    }
    
    /**
     * Función que carga de forma automática un conjunto de claves valor dependiendo de lo que tenga profile
     * @param profile - puede ser "development" o "production" dependiendo de las claves que quieras añadirle
     */
    public loadProfile(profile: "development" | "production"): void {
        if (profile == "development") {
            this.record.set("apiUrl", "http://localhost:3000");
            this.record.set("theme", "dark");
            this.record.set("lang", "es");
        }
        else if (profile == "production")  {
            this.record.set("apiUrl", "https://api.miapp.com");
            this.record.set("theme", "light");
            this.record.set("lang", "en");
        }
    }

}