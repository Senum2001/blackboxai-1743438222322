// Hybrid Data Service - combines local and cloud data
// Local configuration data
export const businessUnits = ['CCS', 'JMSL'];
export const useCases = {
  CCS: ['Distribution Efficiency', 'MT Promo'],
  JMSL: ['Dry Sales']
};

// Simulated cloud data - would be replaced with real API calls
const cloudData = {
  metrics: {
    'mode1': {
      alertTime: '15:42 UTC',
      runtimeCount: '142',
      alertKeeper: 'Kalpa (kalpa@keells.com)',
      kstest: '0.42',
      wasserstein: '1.85',
      mseRef: '0.12',
      mseCurrent: '0.18',
      status: 'Warning',
      xaiResult: 'The current model shows increased error rates...',
      plotData: [
        { x: 1, y: 0.12, type: 'reference' },
        { x: 2, y: 0.15, type: 'reference' },
        { x: 3, y: 0.18, type: 'reference' },
        { x: 1, y: 0.18, type: 'current' },
        { x: 2, y: 0.22, type: 'current' }, 
        { x: 3, y: 0.25, type: 'current' }
      ]
    }
  },
  errors: {
    'mode1': [
      { id: 1, timePeriod: '2025-01', meanPrediction: '1250', error: '-90', exceedsThreshold: true },
      { id: 2, timePeriod: '2025-01', meanPrediction: '980', error: '-65', exceedsThreshold: true },
      { id: 3, timePeriod: '2025-02', meanPrediction: '1100', error: '-42', exceedsThreshold: false }
    ]
  }
};

// Cloud data accessors
export async function getCloudKPIs(mode: string) {
  const data = cloudData.metrics[mode as keyof typeof cloudData.metrics];
  return data ? [
    { rowKey: 'alertTime', value: data.alertTime },
    { rowKey: 'runtimeCount', value: data.runtimeCount },
    { rowKey: 'alertKeeper', value: data.alertKeeper },
    { rowKey: 'kstest', value: data.kstest },
    { rowKey: 'wasserstein', value: data.wasserstein },
    { rowKey: 'mseRef', value: data.mseRef },
    { rowKey: 'mseCurrent', value: data.mseCurrent },
    { rowKey: 'status', value: data.status }
  ] : [];
}

export async function getCloudErrorData(mode: string) {
  return cloudData.errors[mode as keyof typeof cloudData.errors] || [];
}

export async function getXAIResult(mode: string) {
  return cloudData.metrics[mode as keyof typeof cloudData.metrics]?.xaiResult || '';
}

// Helper functions
export function generateShortCode(businessUnit: string, useCase: string) {
  return `${businessUnit.substring(0,2)}-${useCase.substring(0,2)}`;
}

export function getUseCaseOptions(businessUnit: string) {
  return useCases[businessUnit as keyof typeof useCases] || [];
}