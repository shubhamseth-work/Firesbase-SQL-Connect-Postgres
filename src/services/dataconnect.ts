// ============================================
// FIREBASE DATA CONNECT SERVICE
// Initializes Data Connect with correct
// endpoint based on environment
// ============================================

import { getDataConnect, DataConnect } from 'firebase/data-connect';
import { connectorConfig } from '../generated/dataconnect';
import { app } from '../config/firebase';
import config from '../config/environment';
import logger from '../utils/logger';

let dataConnectInstance: DataConnect | null = null;

export const getDataConnectInstance = (): DataConnect => {
  if (dataConnectInstance) {
    return dataConnectInstance;
  }

  if (config.emulator.enabled) {
    // Connect to local emulator
    dataConnectInstance = getDataConnect(app, {
      ...connectorConfig,
      host: config.emulator.host,
      port: config.emulator.dataConnectPort,
      sslEnabled: false,
    });
    logger.info(
      `Data Connect → Emulator at ${config.emulator.host}:${config.emulator.dataConnectPort}`
    );
  } else {
    // Connect to Firebase Data Connect cloud
    dataConnectInstance = getDataConnect(app, connectorConfig);
    logger.info(
      `Data Connect → Cloud (${config.firebase.projectId})`
    );
  }

  return dataConnectInstance;
};

export default getDataConnectInstance;