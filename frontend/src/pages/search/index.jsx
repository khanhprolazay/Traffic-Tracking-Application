import { Input } from "antd";
import AppGoogleMap from "../../components/AppGoogleMap";

export const SearchPage = () => {

    return (
        <div>
            <Input></Input>
            <AppGoogleMap showCamera={true} />
        </div>
    );
};
