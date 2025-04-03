// Dummy data implementation for UI development
const dummyKPIs = {
  'mode1': [
    { rowKey: 'alertTime', value: '15:42 UTC' },
    { rowKey: 'runtimeCount', value: '142' },
    { rowKey: 'alertKeeper', value: 'Kalpa (kalpa@keells.com)' },
    { rowKey: 'kstest', value: '0.42' },
    { rowKey: 'wasserstein', value: '1.85' },
    { rowKey: 'mseRef', value: '0.12' },
    { rowKey: 'mseCurrent', value: '0.18' },
    { rowKey: 'status', value: 'Warning' }
  ],
  // Add data for other modes...
};

const dummyErrors = {
  'mode1': [
    { timePeriod: '2025-01', meanPrediction: '1250', error: '-90', exceedsThreshold: true },
    { timePeriod: '2025-01', meanPrediction: '980', error: '-65', exceedsThreshold: true },
    { timePeriod: '2025-02', meanPrediction: '1100', error: '-42', exceedsThreshold: false }
  ],
  // Add error data for other modes...
};

export async function getKPIs(mode: string) {
  return dummyKPIs[mode as keyof typeof dummyKPIs] || [];
}

export async function getErrorData(mode: string) {
  return dummyErrors[mode as keyof typeof dummyErrors] || [];
}