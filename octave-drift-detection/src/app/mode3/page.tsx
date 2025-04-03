'use client'
import { useEffect, useState, useRef } from 'react'
import { Chart } from 'chart.js'
import 'chartjs-chart-matrix'
import Link from 'next/link'
import Head from 'next/head'
import { getKPIs, getErrorData } from '../../services/dummyDbService'
import ConfusionMatrix from '../../components/ConfusionMatrix'

export default function Mode3Page() {
  const [businessUnit, setBusinessUnit] = useState('CCS')
  const [useCase, setUseCase] = useState('CC-Di')
  const [kpis, setKpis] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [confusionMatrix, setConfusionMatrix] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = async () => {
      try {
        const savedBusinessUnit = localStorage.getItem('businessUnit')
        const savedUseCase = localStorage.getItem('useCase')
        if (savedBusinessUnit) setBusinessUnit(savedBusinessUnit)
        if (savedUseCase) setUseCase(savedUseCase)

        const [kpiData, errorData] = await Promise.all([
          getKPIs('mode3'),
          getErrorData('mode3')
        ])
        setKpis(kpiData)
        setErrors(errorData)
        
        // Extract confusion matrix data from KPIs
        const matrixData = {
          reference: {
            trueA: kpiData.find(k => k.rowKey === 'refTrueA')?.value,
            falseB: kpiData.find(k => k.rowKey === 'refFalseB')?.value,
            falseA: kpiData.find(k => k.rowKey === 'refFalseA')?.value,
            trueB: kpiData.find(k => k.rowKey === 'refTrueB')?.value,
            precision: kpiData.find(k => k.rowKey === 'refPrecision')?.value,
            recall: kpiData.find(k => k.rowKey === 'refRecall')?.value,
            f1: kpiData.find(k => k.rowKey === 'refF1')?.value,
            accuracy: kpiData.find(k => k.rowKey === 'refAccuracy')?.value
          },
          current: {
            trueA: kpiData.find(k => k.rowKey === 'currTrueA')?.value,
            falseB: kpiData.find(k => k.rowKey === 'currFalseB')?.value,
            falseA: kpiData.find(k => k.rowKey === 'currFalseA')?.value,
            trueB: kpiData.find(k => k.rowKey === 'currTrueB')?.value,
            precision: kpiData.find(k => k.rowKey === 'currPrecision')?.value,
            recall: kpiData.find(k => k.rowKey === 'currRecall')?.value,
            f1: kpiData.find(k => k.rowKey === 'currF1')?.value,
            accuracy: kpiData.find(k => k.rowKey === 'currAccuracy')?.value
          }
        }
        setConfusionMatrix(matrixData)
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

  const getUseCaseOptions = () => {
    if (businessUnit === 'CCS') {
      return ['CC-Di', 'CC-MT']
    } else if (businessUnit === 'JMSL') {
      return ['JM-Ch']
    }
    return []
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Head>
        <title>Mode 3 | CL Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">OCTAVE - CL Dashboard</h2>
          
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
                value={useCase || '-'}
                readOnly
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Runtime</h3>
              <input
                type="text"
                value="2h 45m"
                readOnly
                className="w-full bg-gray-700 border-blue-600 rounded p-2 text-white"
              />
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

        {/* Confusion Matrices Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Reference Confusion Matrix */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Reference Confusion Matrix</h2>
            <div className="h-96 bg-gray-700 rounded p-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white">Loading reference matrix...</div>
                </div>
              ) : (
                <ConfusionMatrix 
                  data={[
                    [confusionMatrix.reference?.trueA || 0, confusionMatrix.reference?.falseB || 0],
                    [confusionMatrix.reference?.falseA || 0, confusionMatrix.reference?.trueB || 0]
                  ]}
                  labels={['Class A', 'Class B']}
                  title="Reference Matrix"
                />
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">Precision</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.reference?.precision || 'N/A'}
                </p>
              </div>
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">Recall</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.reference?.recall || 'N/A'}
                </p>
              </div>
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">F1</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.reference?.f1 || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Current Confusion Matrix */}
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Current Confusion Matrix</h2>
            <div className="h-96 bg-gray-700 rounded p-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white">Loading current matrix...</div>
                </div>
              ) : (
                <ConfusionMatrix 
                  data={[
                    [confusionMatrix.current?.trueA || 0, confusionMatrix.current?.falseB || 0],
                    [confusionMatrix.current?.falseA || 0, confusionMatrix.current?.trueB || 0]
                  ]}
                  labels={['Class A', 'Class B']}
                  title="Current Matrix"
                />
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">Precision</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.current?.precision || 'N/A'}
                  {!loading && confusionMatrix.current?.precision && (
                    <span className="text-red-400 text-sm">
                      ({((confusionMatrix.current.precision - confusionMatrix.reference.precision)/confusionMatrix.reference.precision * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">Recall</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.current?.recall || 'N/A'}
                  {!loading && confusionMatrix.current?.recall && (
                    <span className="text-red-400 text-sm">
                      ({((confusionMatrix.current.recall - confusionMatrix.reference.recall)/confusionMatrix.reference.recall * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-blue-900/20 p-2 rounded">
                <p className="text-xs text-blue-200">F1</p>
                <p className="text-lg font-semibold text-white">
                  {loading ? '-' : confusionMatrix.current?.f1 || 'N/A'}
                  {!loading && confusionMatrix.current?.f1 && (
                    <span className="text-red-400 text-sm">
                      ({((confusionMatrix.current.f1 - confusionMatrix.reference.f1)/confusionMatrix.reference.f1 * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Jensen-Shannon</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'jensenShannon')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">PSI</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : kpis.find(k => k.rowKey === 'psi')?.value || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Accuracy (Reference)</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : confusionMatrix.reference?.accuracy || 'N/A'}
              </p>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <h3 className="text-lg font-medium text-blue-200 mb-2">Accuracy (Current)</h3>
              <p className="text-xl">
                {loading ? 'Loading...' : confusionMatrix.current?.accuracy || 'N/A'}
                {!loading && confusionMatrix.current?.accuracy && (
                  <span className="text-red-400 text-sm">
                    ({((confusionMatrix.current.accuracy - confusionMatrix.reference.accuracy)/confusionMatrix.reference.accuracy * 100).toFixed(1)}%)
                  </span>
                )}
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

        {/* XAI Result Section */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">XAI Result</h2>
          <div className="space-y-3 text-white">
            <p>The current model shows decreased performance compared to reference values, particularly in precision (8.2% decrease) and recall (8.7% decrease). The confusion matrices reveal increased misclassification rates between Class A and Class B.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Class A being predicted as Class B increased by 140% (from 5% to 12%)</li>
              <li>Class B being predicted as Class A increased by 166% (from 3% to 8%)</li>
            </ul>
            <p>The model's F1 score has correspondingly decreased by 8% (from 0.88 to 0.81).</p>
            <p className="font-medium text-yellow-300">These metrics suggest the model may require retraining or parameter adjustment.</p>
          </div>
        </div>

        {/* Error and Misclassification Percentages */}
        <div className="bg-red-900/20 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-red-800/50">
          <h2 className="text-2xl font-semibold text-red-300 mb-4">Error and Misclassification Percentages</h2>
          <div className="space-y-3 text-white">
            <p>Overall error rate has increased from 8% to 16% compared to reference data.</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-red-500 h-4 rounded-full" style={{width: '16%'}}></div>
            </div>
            <p>Key changes in misclassification:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Class A → Class B: +140% (from 5% to 12%)</li>
              <li>Class B → Class A: +166% (from 3% to 8%)</li>
            </ul>
          </div>
        </div>

        {/* Misclassified Table */}
        <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Misclassified Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Predicted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-white">
                      Loading misclassified data...
                    </td>
                  </tr>
                ) : errors.length > 0 ? (
                  errors.map((error, index) => (
                    <tr key={index} className="bg-red-900/10">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-300">{error.predicted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{error.actual}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-white">
                      No misclassified data available
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