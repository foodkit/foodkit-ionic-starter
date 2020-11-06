import ApiClient from './apiClient';

export default class AuthService {
    //TODO: add auth state

    constructor(protected apiClient: ApiClient) {}

    public login(username: string, password: string): void {
        const response = this.apiClient.post('/login', {username, password}); //TODO: login url?
    }

    public register(username: string, password: string): void {
        const response = this.apiClient.post('/register', {username, password}); //TODO: login url?
    }
}