import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#96FFE6] py-6 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://www.octave.lk/wp-content/uploads/2023/11/logo.png" 
            alt="OCTAVE Logo" 
            className="h-10 mr-4"
          />
          <h1 className="text-3xl font-bold text-[#F910B2]">
            Drift Detection Tool
          </h1>
        </div>
        <nav>
          <Link href="/" className="text-[#F910B2] hover:text-[#d40e9a]">
            <i className="fas fa-home"></i> Home
          </Link>
        </nav>
      </div>
    </header>
  )
}