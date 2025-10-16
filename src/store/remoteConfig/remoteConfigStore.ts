
import { create } from 'zustand';
import { RemoteConfigState, RemoteConfigKeys } from './types';
import { defaultConfig } from './defaults';
import { RemoteConfigActions } from './actions';

export const useRemoteConfigStore = create<RemoteConfigState>()(
    (set, get) => {
        const actions = new RemoteConfigActions();

        return {
            isApiReady: false,
            isLoading: false,
            error: null,
            isUpdateNeeded: false,
            minimumCodeVersion: 1,
            config: defaultConfig,
            backendApi: null,
            filterPackages: [],
            fetchClient: null,
            isListening: false,
            unsubscribe: undefined,

            initialize: async () => {
                const state = get();
                if (state.isApiReady || state.isLoading) {
                    return;
                }

                set({ isLoading: true, error: null });

                try {
                    const result = await actions.initializeConfig();

                    set({
                        config: result.config,
                        isApiReady: true,
                        isLoading: false,
                        backendApi: result.backendApi || null,
                        fetchClient: result.fetchClient || null,
                        isUpdateNeeded: result.isUpdateNeeded,
                        minimumCodeVersion: result.config.minimum_code_version,
                        enableConnectionFeature: result.config.enable_connection_feature,
                    });

                    // Start listening for changes
                    // get().startListening();

                } catch (error) {
                    console.error('Failed to initialize remote config:', error);
                    set({
                        error: error as Error,
                        isLoading: false,
                        isApiReady: false,
                    });
                }
            },

            refresh: async () => {
                set({ isLoading: true, error: null });
                await get().initialize();
            },

            forceRefresh: async () => {
                set({ isLoading: true, error: null });
                try {
                    const result = await actions.forceRefresh();
                    set({
                        config: result.config,
                        isApiReady: true,
                        isLoading: false,
                        backendApi: result.backendApi || null,
                        fetchClient: result.fetchClient || null,
                        isUpdateNeeded: result.isUpdateNeeded,
                        minimumCodeVersion: result.config.minimum_code_version,
                        enableConnectionFeature: result.config.enable_connection_feature,
                    });
                } catch (error) {
                    console.error('Failed to force refresh remote config:', error);
                    set({
                        error: error as Error,
                        isLoading: false,
                    });
                }
            },

            // startListening: () => {
            //     const state = get();
            //     if (state.isListening) return;

            //     const unsubscribe = actions.startListening((newConfig) => {
            //         // Force a complete state update to ensure re-renders
            //         set((state) => {
            //             return {
            //                 ...state,
            //                 config: newConfig,
            //                 isUpdateNeeded: newConfig.minimum_code_version > state.minimumCodeVersion
            //             };
            //         });
            //     });

            //     set({ isListening: true, unsubscribe });
            // },

            // stopListening: () => {
            //     const state = get();
            //     if (state.unsubscribe) {
            //         state.unsubscribe();
            //     }
            //     set({ isListening: false, unsubscribe: undefined });
            // },

            // Type-safe getter
            getValue: <K extends keyof RemoteConfigKeys>(key: K): RemoteConfigKeys[K] => {
                return get().config[key];
            },

            // Convenience getters - these should trigger re-renders when config changes
            get phoneVerificationCodeLength() {
                return get().config.PhoneVerificationCodeLength;
            },
            get maintenance() {
                const maintenance = get().config.maintenance;
                return maintenance;
            },
            get enablePushNotifications() {
                return get().config.enable_push_notifications;
            },
            get maxUploadSize() {
                return get().config.max_upload_size;
            },
            get sessionTimeout() {
                return get().config.session_timeout;
            },
            get apiTimeout() {
                return get().config.api_timeout;
            },
            get firebaseTimeout() {
                return get().config.firebase_timeout;
            },
            get maxImageRetries() {
                return get().config.max_image_retries;
            },
            get imageRetryDelay() {
                return get().config.image_retry_delay;
            },
            get websocketUrl() {
                return get().config.websocket_url;
            },
            get imageLoadTimeout() {
                return get().config.image_load_timeout;
            },
            get eventsCountLimit() {
                return get().config.events_count_limit;
            },
            get defaultEventLimit() {
                return get().config.default_event_limit;
            },
            get usersQueryLimit() {
                return get().config.users_query_limit;
            },
            get animationDuration() {
                return get().config.animation_duration;
            },
            get cardAnimationDelay() {
                return get().config.card_animation_delay;
            },
            get stepperAnimationDelay() {
                return get().config.stepper_animation_delay;
            },
            get toastDelay() {
                return get().config.toast_delay;
            },
            get countdownDuration() {
                return get().config.countdown_duration;
            },
            get showOnlineStatus() {
                return get().config.show_online_status;
            },
            get enableConnectionFeature() {
                return get().config.enable_connection_feature;
            },
            get hardWallSinceDate() {
                return get().config.hard_wall_since_date;
            }
        };
    }); 