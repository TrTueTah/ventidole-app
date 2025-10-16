import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useFirstTimeShowStore } from '../store/firstTimeShowStore';
import { useRemoteConfigStore } from '../store/remoteConfig/remoteConfigStore';

export const useZustandDebugger = (enabled: boolean = true) => {

    useEffect(() => {
        if (!enabled) return;



        const subscribeToStore = (store: any, name: string) => {
            return store.subscribe((state: any) => {
                console.log(`🔄 ${name} Store Updated:`, state);
            });
        };

        // Global store debugger functions
        (global as any).getAuthState = () => useAuthStore.getState();
        (global as any).getFirstTimeState = () => useFirstTimeShowStore.getState();
        (global as any).getRemoteConfigState = () => useRemoteConfigStore.getState();

        // Subscribe to changes
        const unsubscribes = [
            subscribeToStore(useAuthStore, 'Auth'),
            subscribeToStore(useFirstTimeShowStore, 'FirstTime'),
            subscribeToStore(useRemoteConfigStore, 'RemoteConfig'),
        ];

        return () => {
            unsubscribes.forEach(unsub => unsub());
        };

    }, [enabled]);
}; 