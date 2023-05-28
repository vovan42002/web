import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import { isTokenExpired } from "../common/TokenVerify";
import styles from "../styles/sensors.module.css"

type Props = {};

type State = {
    redirect: string | null,
    userReady: boolean,
    currentUser: IUser & { access_token: string }
}
export default class Sensors extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { access_token: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser || isTokenExpired(currentUser.access_token)) {
            this.setState({ redirect: "/login" });
        }

        this.setState({ currentUser: currentUser, userReady: true })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div className={styles.container_sensors}>
                <div className="">
                    Temperature
                </div>
            </div>
        );
    }
}
