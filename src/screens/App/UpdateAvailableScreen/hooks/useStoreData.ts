import { useEffect, useState } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { APP_ID } from "@env";

const useStoreData = () => {
    const [appstoreUrl, setAppstoreUrl] = useState<any>(null);

    useEffect(() => {
        const appStoreUrl = Platform.select({
            ios: `https://apps.apple.com/app/id/${APP_ID}`,
            android: `https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`,
        });
        setAppstoreUrl(appStoreUrl);
    }, []);

    return { appstoreUrl };
};
export default useStoreData;