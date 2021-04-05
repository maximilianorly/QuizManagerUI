import axios from "axios";
import IUser from "../interfaces/IUser";
import IUserCredentials from "../interfaces/IUserCredentials";

export default class UserService {
    private readonly portApi: string = "https://localhost:5001";
    private readonly controllerName: string = "User";

    // Promise<void>
    public async verifyCredentials(Credentials: IUserCredentials): Promise<any> {
        let authenticationSuccessful: boolean = false;

        await axios
        .post(`${this.portApi}/api/${this.controllerName}`, Credentials, {headers: { "Access-Control-Allow-Origin": "*" }})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                authenticationSuccessful = response.data as boolean;

                if (authenticationSuccessful && response.data !== "") {
                    const user = response.data as IUser;
                    console.log(user);
                    return user;
                }
            }
        });

        return authenticationSuccessful;
    }
}