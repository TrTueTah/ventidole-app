import { RemoteConfigKeys } from './types';
import { defaultConfig } from './defaults';

declare const __DEV__: boolean;

export class RemoteConfigParser {
    async parseConfig(): Promise<RemoteConfigKeys> {
        const config = {
            minimum_code_version: defaultConfig.minimum_code_version,
            maintenance: defaultConfig.maintenance,
            PhoneVerificationCodeLength: defaultConfig.PhoneVerificationCodeLength,
            show_online_status: defaultConfig.show_online_status,
            websocket_url: defaultConfig.websocket_url,
            enable_push_notifications: defaultConfig.enable_push_notifications,
            enable_connection_feature: defaultConfig.enable_connection_feature,
            max_upload_size: defaultConfig.max_upload_size,
            session_timeout: defaultConfig.session_timeout,
            api_timeout: defaultConfig.api_timeout,
            firebase_timeout: defaultConfig.firebase_timeout,
            max_image_retries: defaultConfig.max_image_retries,
            image_retry_delay: defaultConfig.image_retry_delay,
            image_load_timeout: defaultConfig.image_load_timeout,
            events_count_limit: defaultConfig.events_count_limit,
            default_event_limit: defaultConfig.default_event_limit,
            users_query_limit: defaultConfig.users_query_limit,
            animation_duration: defaultConfig.animation_duration,
            card_animation_delay: defaultConfig.card_animation_delay,
            stepper_animation_delay: defaultConfig.stepper_animation_delay,
            toast_delay: defaultConfig.toast_delay,
            countdown_duration: defaultConfig.countdown_duration,
            filter_packages: defaultConfig.filter_packages,
            hard_wall_since_date: defaultConfig.hard_wall_since_date,
        };

        return config;
    }

    // getBackendPath(): string | null {
    //     return this.configInstance.getString('BackendPath');
    // }

    // getFilterPackages(): string[] | null {
    //     try {
    //         const packagesString = this.configInstance.getString('filter_packages');
    //         if (!packagesString) return null;
    //         return JSON.parse(packagesString);
    //     } catch {
    //         return null;
    //     }
    // }


    // async setDefaults(): Promise<void> {
    //     await this.configInstance.setDefaults({
    //         ...defaultConfig,
    //         enable_connection_feature: false,
    //     } as any);
    // }

    // async fetchAndActivate(): Promise<void> {
    //     await this.configInstance.fetchAndActivate();
    // }

    // async forceRefresh(): Promise<void> {
    //     // Force fetch bypassing cache
    //     await this.configInstance.fetch(0);
    //     await this.configInstance.activate();
    // }

    // onConfigUpdated(callback: (event: any) => void): () => void {
    //     const unsubscribe = this.configInstance.onConfigUpdated((event: any) => {
    //         callback(event);
    //     });
    //     return unsubscribe;
    // }
}
