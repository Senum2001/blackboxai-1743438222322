'use client'
import { useEffect, useState, useRef } from 'react'
import { Chart } from 'chart.js'
import 'chartjs-chart-matrix'
import Link from 'next/link'
import Head from 'next/head'
import { getKPIs, getErrorData } from '../../services/dummyDbService'
import ConfusionMatrix from '../../components/ConfusionMatrix'

export default function Mode4Page() {
  const [businessUnit, setBusinessUnit] = useState('CCS')
  const [useCase, setUseCase] = useState('Distribution Efficiency')
  const [kpis, setKpis] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = async () => {
      try {
        const savedBusinessUnit = localStorage.getItem('businessUnit')
        const savedUseCase = localStorage.getItem('useCase')
        if (savedBusinessUnit) setBusinessUnit(savedBusinessUnit)
        if (savedUseCase) setUseCase(savedUseCase)

        const [kpiData, errorData] = await Promise.all([
          getKPIs('mode4'),
          getErrorData('mode4')
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
        <title>Mode 4 | CLCD Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">OCTAVE - CLCD</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Business Unit</h3>
              <select
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
                value={businessUnit}
                onChange={handleBusinessUnitChange}
              >
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
              >
                <option value="Distribution Efficiency">Distribution Efficiency</option>
                <option value="Load Forecasting">Load Forecasting</option>
              </select>
            </div>

            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Short Code</h3>
              <input
                type="text"
                value={businessUnit && useCase ? `${businessUnit.substring(0,2)}-${useCase.substring(0,2)}` : '-'}
                readOnly
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>

            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Runtime</h3>
              <input
                type="text"
                value={loading ? 'Loading...' : kpis.find(k => k.rowKey === 'runtime')?.value || 'N/A'}
                readOnly
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">MAPE/MSE Plot</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Visualization placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          </div>
          <div className="mt-4 bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/50">
            <h3 className="text-lg font-medium text-yellow-200 mb-2">Status</h3>
            <p className={`text-xl ${
              loading ? '' : 
              kpis.find(k => k.rowKey === 'status')?.value === 'Warning' ? 'text-yellow-300' : 
              kpis.find(k => k.rowKey === 'status')?.value === 'Error' ? 'text-red-400' : 
              'text-green-400'
            }`}>
              {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'status')?.value || 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Current Confusion Matrix</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-blue-200 uppercase tracking-wider">Predicted →</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-blue-200 uppercase tracking-wider">Class A</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-blue-200 uppercase tracking-wider">Class B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-200">Actual ↓ Class A</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-white">82</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-white">12</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-200">Actual ↓ Class B</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-white">8</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-white">78</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="bg-blue-900/20 p-2 rounded">
              <p className="text-xs text-blue-200">Precision</p>
              <p className="text-lg font-semibold text-white">0.78</p>
            </div>
            <div className="bg-blue-900/20 p-2 rounded">
              <p className="text-xs text-blue-200">Recall</p>
              <p className="text-lg font-semibold text-white">0.84</p>
            </div>
            <div className="bg-blue-900/20 p-2 rounded">
              <p className="text-xs text-blue-200">F1</p>
              <p className="text-lg font-semibold text-white">0.81</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">XAI Result</h2>
          <div className="space-y-3 text-white">
            <p>The current model shows increased error rates compared to reference values, particularly in MSE (50% increase) and MAE (37.5% increase). The Wasserstein distance of 1.85 indicates significant distribution shift. The KStest value of 0.42 suggests moderate deviation from expected behavior.</p>
            <p className="font-medium text-yellow-300">These metrics collectively suggest the model may require retraining or parameter adjustment.</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Error Comparison Top(-)</h2>
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
                    <tr key={index} className="bg-red-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.timePeriod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.meanPrediction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-300">{error.error}</td>
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
      </main>
    </div>
  )
}