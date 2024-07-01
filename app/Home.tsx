import { useNetInfo } from "@react-native-community/netinfo";
import { InternetError } from "./InternetError";
import { Web } from "./Web";

export function Home() {
    const { isConnected } = useNetInfo();
    if (isConnected === false) {
        return <InternetError />;
    }
    return <Web />;
}