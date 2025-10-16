import { createNavigationContainerRef } from '@react-navigation/native';
import { AppState } from 'react-native';
import { RootStackParamList } from 'typescript/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

interface QueuedNavigation {
    route: keyof RootStackParamList;
    params?: any;
    timestamp: number;
}

class NavigationService {
    private navigationQueue: QueuedNavigation[] = [];
    private isReady = false;

    setReady() {
        this.isReady = true;
        this.processQueue();
    }

    isNavigationReady(): boolean {
        return this.isReady && navigationRef.isReady();
    }

    navigate<T extends keyof RootStackParamList>(
        route: T,
        params?: RootStackParamList[T]
    ) {
        // If navigation isn't ready or app is in background, queue it
        if (!this.isNavigationReady() || AppState.currentState !== 'active') {
            this.queueNavigation(route, params);
            return;
        }

        // Execute immediately if ready
        this.executeNavigation(route, params);
    }

    private queueNavigation<T extends keyof RootStackParamList>(
        route: T,
        params?: RootStackParamList[T]
    ) {
        const navigation: QueuedNavigation = {
            route,
            params,
            timestamp: Date.now(),
        };

        // Remove any existing navigation to the same route to avoid duplicates
        this.navigationQueue = this.navigationQueue.filter(
            item => item.route !== route
        );

        this.navigationQueue.push(navigation);

        // Clean old items (older than 30 seconds)
        const now = Date.now();
        this.navigationQueue = this.navigationQueue.filter(
            item => now - item.timestamp < 30000
        );
    }

    private executeNavigation<T extends keyof RootStackParamList>(
        route: T,
        params?: RootStackParamList[T]
    ): boolean {
        try {
            if (navigationRef.isReady()) {
                const navigate = navigationRef.navigate as (route: T, params?: RootStackParamList[T]) => void;
                if (params !== undefined) {
                    navigate(route, params);
                } else {
                    navigate(route);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Navigation failed:', error);
            return false;
        }
    }

    processQueue() {
        if (!this.isNavigationReady() || AppState.currentState !== 'active') {
            return;
        }

        // Process one navigation at a time (chat app standard)
        if (this.navigationQueue.length > 0) {
            const navigation = this.navigationQueue.shift()!;
            const success = this.executeNavigation(navigation.route, navigation.params);

            if (!success) {
                // Put it back at the front if it failed
                this.navigationQueue.unshift(navigation);
            }
        }
    }

    reset() {
        this.navigationQueue = [];
        this.isReady = false;
    }

    // For handling app state changes
    onAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'active') {
            // Small delay to ensure app is fully active
            setTimeout(() => {
                this.processQueue();
            }, 100);
        }
    };
}

export const navigationService = new NavigationService(); 