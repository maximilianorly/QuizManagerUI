import axios from "axios";
import IUser from "../interfaces/IUser";
import IUserCredentials from "../interfaces/IUserCredentials";

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";

    // Promise<void>
    public async verifyCredentials(Credentials: IUserCredentials): Promise<boolean> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, JSON.parse(JSON.stringify(Credentials)))
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                authenticationSuccessful = response.data as boolean;
            }
        });

        return authenticationSuccessful;
    }
}