import {AppConfig} from "../src/ejercicio-PE/clases/AppConfig.js";
import { IAppConfig } from "../src/ejercicio-PE/interfaces/IAppConfig.js";
import {test, expect, describe, beforeEach} from 'vitest';

describe ("AppConfig", () => {
    test ("Se pueden crear dos instancias de AppConfig pero ambas referencias apuntarán al mismo objeto", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("Hola", "Mundo");
        const appConfigInstance2 = AppConfig.getInstance();
        expect(appConfigInstance2.get("Hola")).toEqual("Mundo");
        appConfigInstance2.set("Adios", "Mundo");
        expect(appConfigInstance).toBe(appConfigInstance2);
        expect(appConfigInstance).toEqual(appConfigInstance2);
    });

    test ("Se puede añadir y obtener un par clave-valor nuevo al map", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "test");
        appConfigInstance.reset();
        appConfigInstance.set("Hola", "Mundo");
        expect(appConfigInstance.get("Hola")).toEqual("Mundo");
    });

    test ("Se pueden obtener todos los pares clave-valor declarados en el mapa", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "test");
        appConfigInstance.reset();
        appConfigInstance.set("Hola", "Mundo");
        const copy: Map<string,string> = new Map();
        copy.set("Hola", "Mundo");
        expect(appConfigInstance.getAll()).toEqual(copy);
    });

    test ("Se puede resetear el mapa si se encuentra la clave env asociada a test", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "test");
        appConfigInstance.reset();
        expect(appConfigInstance.getAll()).toEqual(new Map());
    });

    test ("Salta un mensaje de error si no está la clave env asociada a test al hacer reset()", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "production");
        expect(() => appConfigInstance.reset()).toThrow("reset() solo está permitido en entorno de pruebas");
    });

    test ("Se pueden cargar claves-valor por defecto al hacer loadProfile con development", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "test");
        appConfigInstance.reset();
        appConfigInstance.loadProfile("development");
        const mapDevelopment: Map<string, string> = new Map();
        mapDevelopment.set("apiUrl", "http://localhost:3000");
        mapDevelopment.set("theme", "dark");
        mapDevelopment.set("lang", "es");
        expect(appConfigInstance.getAll()).toEqual(mapDevelopment);
    });

    test ("Se pueden cargar claves-valor por defecto al hacer loadProfile con production", () => {
        const appConfigInstance = AppConfig.getInstance();
        appConfigInstance.set("env", "test");
        appConfigInstance.reset();
        appConfigInstance.loadProfile("production");
        const mapDevelopment: Map<string, string> = new Map();
        mapDevelopment.set("apiUrl", "https://api.miapp.com");
        mapDevelopment.set("theme", "light");
        mapDevelopment.set("lang", "en");
        expect(appConfigInstance.getAll()).toEqual(mapDevelopment);
    });
});