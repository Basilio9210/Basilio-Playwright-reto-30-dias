import { UserModel } from "../Models/UserModel";

export class UserFactory{

    private static defaultPassword = 'Password123'

    private static base(overrides?: Partial<UserModel>): UserModel{
        
        const defaults: UserModel = {

            username: 'user-' + crypto.randomUUID().slice(0,8),
            employee: 'Default Employee',
            password: this.defaultPassword,
            confirmPassword: this.defaultPassword,
            role: 'ESS',
            status: 'Enabled'
        };

        return {...defaults, ...(overrides || {})}
    }

    static createEmployeeESS (overrides?: Partial<UserModel>){

        return this.base({role: 'ESS',...(overrides || {})})

    };

    static createAdmin (overrides?: Partial<UserModel>){

        return this.base({role: 'Admin',...(overrides || {})})

    };

}