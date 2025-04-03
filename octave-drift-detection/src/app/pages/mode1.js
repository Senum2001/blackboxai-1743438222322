import { useRouter } from 'next/router'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

export default function Mode1() {
  const router = useRouter()
  const { businessUnit, useCase, shortCode } = router.query

  if (!businessUnit || !useCase) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Missing Parameters</h2>
            <p className="mb-4">Please go back to the form and select all required options.</p>
            <a 
              href="/" 
              className="bg-[#96FFE6] hover:bg-[#85e6d9] text-[#F910B2] font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Back to Form
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">OCTAVE - RGCD Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Business Unit</h3>
              <p className="text-xl">{businessUnit}</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Use Case</h3>
              <p className="text-xl">{useCase}</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Short Code</h3>
              <p className="text-xl">{shortCode || `${businessUnit.substring(0,2)}-${useCase.substring(0,2)}`}</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Runtime</h3>
              <p className="text-xl">2h 45m</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Current Alert Time</h3>
              <p className="text-xl">15:42 UTC</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">No. of Runtime</h3>
              <p className="text-xl">142</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Alert Keeper</h3>
              <p className="text-xl">Active</p>
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* MAPE/MSE Plot */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">MAPE/MSE Plot</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <i className="fas fa-chart-line text-4xl text-[#F910B2]"></i>
            </div>
          </div>

          {/* State Colors */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Current State</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-300 rounded-full animate-pulse"></div>
                </div>
                <span className="text-lg">Critical</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-300 rounded-full animate-pulse"></div>
                </div>
                <span className="text-lg">Warning</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>
                <span className="text-lg">Caution</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-300 rounded-full animate-pulse"></div>
                </div>
                <span className="text-lg">Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">KStest</h3>
              <p className="text-xl">0.42</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Wasserstein Distance</h3>
              <p className="text-xl">1.85</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Mean MSE (Reference)</h3>
              <p className="text-xl">0.12</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Mean MSE (Current)</h3>
              <p className="text-xl">0.18</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Status</h3>
              <p className="text-xl text-red-500">Warning</p>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Error Comparison Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Error Comparison Top(-)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#96FFE6]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">Time Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">Mean Prediction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">Error</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1250</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">-90</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">980</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500">-65</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-02</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1100</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">-42</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* XAI Result */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">XAI Result</h2>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <p className="text-gray-700">
                The current model shows increased error rates compared to reference values, particularly in MSE (50% increase) and MAE (37.5% increase). The Wasserstein distance of 1.85 indicates significant distribution shift. The KStest value of 0.42 suggests moderate deviation from expected behavior. These metrics collectively suggest the model may require retraining or parameter adjustment.
              </p>
            </div>
          </div>
        </div>

        {/* Error Threshold Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Error Threshold Exceeded</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#96FFE6]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">y_true</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">y_pred</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#F910B2] uppercase tracking-wider">percentage_error</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1250</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1340</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">7.2%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">980</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1045</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500">6.6%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1100</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1142</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">3.8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}