'use client'
import { useState, useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import 'chartjs-chart-matrix'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getKPIs, getErrorData } from '../../services/dummyDbService'
import ConfusionMatrix from '../../components/ConfusionMatrix'

export default function Mode2Page() {
  const [businessUnit, setBusinessUnit] = useState('')
  const [useCase, setUseCase] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [kpis, setKpis] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initData = async () => {
      try {
        const [kpiData, errorData] = await Promise.all([
          getKPIs('mode2'),
          getErrorData('mode2')
        ])
        setKpis(kpiData)
        setErrors(errorData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    initData()
  }, [])

  const handleBusinessUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unit = e.target.value
    setBusinessUnit(unit)
    setUseCase('')
    setShortCode('')
  }

  const handleUseCaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uc = e.target.value
    setUseCase(uc)
    if (businessUnit) {
      setShortCode(`${businessUnit.substring(0,2)}-${uc.substring(0,2)}`)
    }
  }

  const getUseCaseOptions = () => {
    if (businessUnit === 'CCS') {
      return ['Distribution Efficiency', 'MT Promo']
    } else if (businessUnit === 'JMSL') {
      return ['Dry Sales']
    }
    return []
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
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
                {getUseCaseOptions().map(option => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Current Alert Time</h3>
              <p className="text-xl mt-auto">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'alertTime')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col">
              <h3 className="text-lg font-medium text-blue-200 mb-2">No. of Runtime</h3>
              <p className="text-xl mt-auto">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'runtimeCount')?.value || '0'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Alert Keeper</h3>
              <p className="text-xl mt-auto">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'alertKeeper')?.value || 'N/A'}
              </p>
            </div>
          </div>

        </div>

        {/* Confusion Matrix Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Confusion Matrix</h2>
          <div className="h-96 bg-gray-700 rounded p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-white">Loading confusion matrix...</div>
              </div>
            ) : (
              <ConfusionMatrix 
                data={[
                  [0.8, 0.1, 0.1],
                  [0.2, 0.6, 0.2], 
                  [0.1, 0.1, 0.8]
                ]}
                labels={['Class 1', 'Class 2', 'Class 3']}
                title="Prediction vs Actual"
              />
            )}
          </div>
        </div>

        {/* Hyperparameters Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Hyperparameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Auto Hyperparameters</h3>
              <p className="text-xl">True</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Custom Hyperparameters</h3>
              <p className="text-xl">[10,2,3]</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Default Hyperparameters</h3>
              <p className="text-xl">False</p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Status</h3>
              <p className="text-xl text-orange-400">Warning</p>
            </div>
          </div>
        </div>

        {/* XAI Results Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">XAI Result</h2>
          <div className="space-y-3 text-white">
            <p>The current model shows increased error rates compared to reference values, particularly in:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>MSE (50% increase)</li>
              <li>MAE (37.5% increase)</li>
            </ul>
            <p>The Wasserstein distance of <span className="font-semibold">1.85</span> indicates significant distribution shift.</p>
            <p>The KStest value of <span className="font-semibold">0.42</span> suggests moderate deviation from expected behavior.</p>
          </div>
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