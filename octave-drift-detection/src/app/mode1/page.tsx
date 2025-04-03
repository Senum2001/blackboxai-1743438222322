'use client'
import { useEffect, useState, useRef } from 'react'
import { Chart } from 'chart.js'
import 'chartjs-chart-matrix'
import ConfusionMatrix from '../../components/ConfusionMatrix'
import Head from 'next/head'
import { 
  businessUnits,
  getUseCaseOptions,
  generateShortCode,
  getCloudKPIs as getKPIs,
  getCloudErrorData as getErrorData,
  getXAIResult
} from '../../services/hybridDataService'

export default function Mode1Page() {
  const chartRef = useRef<Chart | null>(null)
  const chartRef = useRef<Chart | null>(null)
  const [businessUnit, setBusinessUnit] = useState(businessUnits[0])
  const [useCase, setUseCase] = useState(getUseCaseOptions(businessUnits[0])[0])
  const [kpis, setKpis] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [xaiMessage, setXaiMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = async () => {
      try {
        const savedBusinessUnit = localStorage.getItem('businessUnit')
        const savedUseCase = localStorage.getItem('useCase')
        if (savedBusinessUnit) setBusinessUnit(savedBusinessUnit)
        if (savedUseCase) setUseCase(savedUseCase)
        
        const [kpiData, errorData, xaiResult] = await Promise.all([
          getKPIs('mode1'),
          getErrorData('mode1'),
          getXAIResult('mode1')
        ])
        setKpis(kpiData)
        setErrors(errorData)
        setXaiMessage(xaiResult)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    initData()
  }, [])

  const handleBusinessUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setBusinessUnit(value)
    setUseCase('')
    localStorage.setItem('businessUnit', value)
  }

  const handleUseCaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setUseCase(value)
    localStorage.setItem('useCase', value)
  }


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Head>
        <title>Mode 1 | Business Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">OCTAVE - RG Dashboard</h2>
          
          {/* Business Unit and Use Case Selector */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Business Unit</h3>
              <select
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
                value={businessUnit}
                onChange={handleBusinessUnitChange}
              >
                <option value="">Select Business Unit</option>
                <option value="CCS">CCS</option>
                <option value="JMSL">JMSL</option>
              </select>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Use Case</h3>
              <select
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
                value={useCase}
                onChange={handleUseCaseChange}
                disabled={!businessUnit}
              >
                <option value="">{businessUnit ? 'Select Use Case' : 'Select Business Unit first'}</option>
                {getUseCaseOptions(businessUnit).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Short Code</h3>
              <input
                type="text"
                value={businessUnit && useCase ? `${businessUnit.substring(0,2)}-${useCase.substring(0,2)}` : '-'}
                onChange={(e) => {}}
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Runtime</h3>
              <input
                type="text"
                value="2h 45m"
                onChange={(e) => {}}
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Current Alert Time</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'alertTime')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">No. of Runtime</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'runtimeCount')?.value || '0'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Alert Keeper</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'alertKeeper')?.value || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">MAPE/MSE Plot</h2>
          <div className="h-64 bg-gray-700 rounded p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-white">Loading plot data...</div>
              </div>
            ) : (
              <div className="relative h-full">
                <canvas 
                  id="mapeMseChart"
                  className="w-full h-full"
                  ref={(el) => {
                    if (el && !loading) {
                      const ctx = el.getContext('2d');
                      if (ctx) {
                        if (chartRef.current) {
                          chartRef.current.destroy();
                        }
                        chartRef.current = new Chart(ctx, {
                          type: 'line',
                          data: {
                            labels: errors.map((_, i) => `Data Point ${i+1}`),
                            datasets: [
                              {
                                label: 'Reference MSE',
                                data: kpis
                                  .filter(k => k.rowKey.includes('mseRef'))
                                  .map(k => parseFloat(k.value)),
                                borderColor: 'rgb(59, 130, 246)',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                tension: 0.1,
                                fill: true
                              },
                              {
                                label: 'Current MSE', 
                                data: kpis
                                  .filter(k => k.rowKey.includes('mseCurrent'))
                                  .map(k => parseFloat(k.value)),
                                borderColor: 'rgb(239, 68, 68)',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                tension: 0.1,
                                fill: true
                              }
                            ]
                          },
                          options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                labels: {
                                  color: '#e5e7eb'
                                }
                              },
                              tooltip: {
                                mode: 'index',
                                intersect: false
                              }
                            },
                            scales: {
                              x: {
                                title: {
                                  display: true,
                                  text: 'Data Points',
                                  color: '#93c5fd',
                                  font: {
                                    weight: 'bold'
                                  }
                                },
                                grid: {
                                  color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                  color: '#e5e7eb',
                                  font: {
                                    size: 12
                                  }
                                }
                              },
                              y: {
                                title: {
                                  display: true,
                                  text: 'Error Value',
                                  color: '#93c5fd',
                                  font: {
                                    weight: 'bold'
                                  }
                                },
                                beginAtZero: true,
                                grid: {
                                  color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                  color: '#e5e7eb',
                                  font: {
                                    size: 12
                                  },
                                  callback: (value) => typeof value === 'number' ? value.toFixed(2) : value
                                }
                              }
                            },
                            animation: {
                              duration: 1000,
                              easing: 'easeInOutQuad'
                            },
                            elements: {
                              point: {
                                radius: 4,
                                hoverRadius: 6
                              }
                            }
                          }
                        });
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* KPIs Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">KStest</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'kstest')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Wasserstein Distance</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'wasserstein')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Mean MSE (Reference)</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'mseRef')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Mean MSE (Current)</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'mseCurrent')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Status</h3>
              <p className={`text-xl ${
                loading ? '' : 
                kpis.find(k => k.rowKey === 'status')?.value === 'Warning' ? 'text-yellow-400' : 
                kpis.find(k => k.rowKey === 'status')?.value === 'Error' ? 'text-red-400' : 
                'text-green-400'
              }`}>
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'status')?.value || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* XAI Results Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">XAI Result</h2>
          {loading ? (
            <div className="text-white">Loading XAI results...</div>
          ) : (
            <div className="space-y-3 text-white" dangerouslySetInnerHTML={{__html: xaiMessage}} />
          )}
        </div>

        {/* Error Comparison Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Error Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Time Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Mean Prediction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-white">
                      Loading error data...
                    </td>
                  </tr>
                ) : errors.length > 0 ? (
                  errors.map((error, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.timePeriod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.meanPrediction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">{error.error}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-white">
                      No error data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Error Threshold Section */}
        <div className="bg-red-900/20 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-red-800/50">
          <h2 className="text-2xl font-semibold text-red-300 mb-4">Error Threshold Exceeded</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-red-800/50">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider">y_true</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider">y_pred</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider">percentage_error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-800/50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-white">
                      Loading threshold data...
                    </td>
                  </tr>
                ) : errors.filter(e => e.exceedsThreshold).length > 0 ? (
                  errors
                    .filter(e => e.exceedsThreshold)
                    .map((error, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.yTrue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.yPred}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-300">{error.percentageError}%</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-white">
                      No threshold exceedances
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}