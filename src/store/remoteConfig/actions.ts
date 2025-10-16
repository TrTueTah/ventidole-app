import { BACKEND_BASE_URL, CODE_VERSION } from '@env';
import { RemoteConfigParser } from './parser';
import { RemoteConfigKeys } from './types';
import { initializeApiClient } from 'src/api/backend-api';

export class RemoteConfigActions {
  private parser = new RemoteConfigParser();

  async initializeConfig(): Promise<{
    config: RemoteConfigKeys;
    isUpdateNeeded: boolean;
    backendApi?: any;
    fetchClient?: any;
  }> {
    // await this.parser.setDefaults();
    // await this.parser.fetchAndActivate();

    const newConfig = await this.parser.parseConfig();

    const currentVersion = parseInt(CODE_VERSION || '1');
    const isLocal = CODE_VERSION === '-999';
    const isUpdateNeeded = isLocal
      ? false
      : currentVersion <= newConfig.minimum_code_version;
    console.log('CODE_VERSION', CODE_VERSION);

    const backendUrl = BACKEND_BASE_URL || 'https://api.ventidole.app';
    console.log('backendUrl', backendUrl);
    if (CODE_VERSION === '-999') {
      newConfig.websocket_url = 'ws://192.168.50.62:8082';
    } else if (backendUrl && backendUrl.includes('/dev/')) {
      newConfig.websocket_url = 'wss://api.ventidole.app/dev';
    } else {
      newConfig.websocket_url = 'wss://api.ventidole.app/prod';
    }

    const backendApi = await initializeApiClient(backendUrl);

    return {
      config: newConfig,
      isUpdateNeeded,
      backendApi: backendApi.queryClient,
      fetchClient: backendApi.fetchClient,
    };
  }

  async handleConfigUpdate(): Promise<{
    config: RemoteConfigKeys;
    isUpdateNeeded: boolean;
    backendApi?: any;
    fetchClient?: any;
  }> {
    return this.initializeConfig();
  }

  async forceRefresh(): Promise<{
    config: RemoteConfigKeys;
    isUpdateNeeded: boolean;
    backendApi?: any;
    fetchClient?: any;
  }> {
    return this.initializeConfig();
  }

  // startListening(
  //   onConfigUpdate: (config: RemoteConfigKeys) => void,
  // ): () => void {
  //   const unsubscribe = this.parser.onConfigUpdated(async () => {
  //     try {
  //       const result = await this.handleConfigUpdate();
  //       onConfigUpdate(result.config);
  //     } catch (error) {
  //       console.error('🔍 Actions - Failed to update remote config:', error);
  //     }
  //   });

  //   return unsubscribe;
  // }
}
