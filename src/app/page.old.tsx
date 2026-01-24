export default function Home() {
  return (
    <section className="relative py-16 lg:py-24 w-full flex-grow flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            ECH Institute
          </h1>
          <h2 className="text-2xl lg:text-3xl text-[#F5A51D] font-semibold mb-6">
            Education, Community Building, Homesteading Ethereum!
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We are a 501(c)(3) nonprofit organization dedicated to advancing education and fostering community building within the decentralized ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.ethcatherders.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F5A51D] hover:bg-[#FAD28E] text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 text-lg shadow-lg"
            >
              Visit ethcatherders.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
