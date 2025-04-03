import { useRouter } from 'next/router'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

export default function Mode2() {
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
          <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">Other - RGCD Dashboard</h2>
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
              <p className="text-xl">1h 30m</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">KStest</h3>
              <p className="text-xl">0.12</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Wasserstein Distance</h3>
              <p className="text-xl">0.85</p>
            </div>
            <div className="bg-[#96FFE6] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#F910B2] mb-2">Status</h3>
              <p className="text-xl text-green-500">Normal</p>
            </div>
          </div>
        </div>

        {/* XAI Result */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#F910B2] mb-4">XAI Result</h2>
          <div className="bg-[#96FFE6] p-4 rounded-lg">
            <p className="text-gray-700">
              The current model shows stable performance with minimal deviation from reference values. The Wasserstein distance of 0.85 and KStest value of 0.12 suggest the model is operating within expected parameters. No immediate action is required.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}