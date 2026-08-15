import process from "process"

export class Environment {
    static get ADMIN_USERNAME(): string {
        return Environment.getRequired('ADMIN_USERNAME')
    }
    static get ADMIN_PASSWORD(): string {
        return Environment.getRequired('ADMIN_PASSWORD')
    }
    static get EMPLOYEE_USERNAME(): string {
        return Environment.getRequired('EMPLOYEE_USERNAME')
    }
    static get EMPLOYEE_PASSWORD(): string {
        return Environment.getRequired('EMPLOYEE_PASSWORD')
    }

    private static getRequired(key: string): string {
        const value = (process.env as Record<string, string | undefined>)[key]
        if (!value) {
            throw new Error('Environment variable: ' + key + ' does not exist')
        }
        return value
    }
}