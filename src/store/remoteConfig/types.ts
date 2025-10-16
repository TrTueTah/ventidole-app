import { Client } from "openapi-fetch";
import { OpenapiQueryClient } from "openapi-react-query";
import { paths } from "src/schemes/openapi";

export interface RemoteConfigKeys {
    // Version control
    minimum_code_version: number;
    websocket_url: string;

    // App features
    maintenance: boolean;
    PhoneVerificationCodeLength: string;
    show_online_status: boolean;

    // Feature flags
    enable_push_notifications: boolean;
    enable_connection_feature: boolean;

    // App settings
    max_upload_size: number;
    session_timeout: number;

    // API timeouts
    api_timeout: number;
    firebase_timeout: number;

    // Image loading settings
    max_image_retries: number;
    image_retry_delay: number;
    image_load_timeout: number;

    // Event limits
    events_count_limit: number;
    default_event_limit: number;
    users_query_limit: number;

    // Animation settings
    animation_duration: number;
    card_animation_delay: number;
    stepper_animation_delay: number;

    // UI settings
    toast_delay: number;
    countdown_duration: number;
    filter_packages: string[];

    // Trial wall settings
    hard_wall_since_date: string;
}

export interface RemoteConfigState {
    // App state
    isApiReady: boolean;
    isLoading: boolean;
    error: Error | null;

    // Version control
    isUpdateNeeded: boolean;
    minimumCodeVersion: number;

    // Config data
    config: RemoteConfigKeys;

    // API clients
    fetchClient: Client<paths, `${string}/${string}`> | null;
    backendApi: OpenapiQueryClient<paths> | null;

    // Listening state
    isListening: boolean;
    unsubscribe?: () => void;

    // Actions
    initialize: () => Promise<void>;
    refresh: () => Promise<void>;
    forceRefresh: () => Promise<void>;
    // startListening: () => void;
    // stopListening: () => void;

    // Type-safe getter
    getValue: <K extends keyof RemoteConfigKeys>(key: K) => RemoteConfigKeys[K];

    // Convenience getters
    phoneVerificationCodeLength: string;
    maintenance: boolean;
    showOnlineStatus: boolean;
    enablePushNotifications: boolean;
    maxUploadSize: number;
    sessionTimeout: number;
    apiTimeout: number;
    firebaseTimeout: number;
    maxImageRetries: number;
    imageRetryDelay: number;
    websocketUrl: string;
    imageLoadTimeout: number;
    eventsCountLimit: number;
    defaultEventLimit: number;
    usersQueryLimit: number;
    animationDuration: number;
    cardAnimationDelay: number;
    stepperAnimationDelay: number;
    toastDelay: number;
    countdownDuration: number;
    enableConnectionFeature: boolean;
    hardWallSinceDate: string;
}
