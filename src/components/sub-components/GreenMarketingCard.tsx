const MarketingCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-50 to-teal-50 py-12 px-4 font-sans">
      <div className="max-w-full mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-sky-200 mb-8">
          {/* Hero Section with Background Image */}
          <div className="relative py-16 px-8 text-center text-white">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFwcHklMjBsaWZlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600")',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 to-sky-900/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1">
                <span className="text-white text-sm font-medium">
                  🌟 Limited Time Offer
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                Happy Life
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-sky-100 mb-2 drop-shadow-md">
                Qweezzot
              </h2>
              <div className="w-24 h-1 bg-sky-300 mx-auto mt-6 rounded-full"></div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Text Content with Side Image */}
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
                    alt="Healthy Lifestyle"
                    className="w-20 h-20 rounded-full object-cover border-4 border-sky-200 shadow-md"
                  />
                </div>
                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 flex-1">
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    There is nothing more important than a balanced lifestyle
                    built on quality, comfort, and consistency.{" "}
                    <span className="font-semibold text-sky-700">
                      Now is the time to choose products that support your
                      everyday living.
                    </span>
                  </p>

                  <p className="text-lg leading-relaxed text-gray-700">
                    We provide a structured platform offering quality
                    everyday-use products along with an opportunity to build
                    sustainable income through a transparent business model.
                    Become a direct sales associate and grow by sharing
                    value-driven products within your network.
                  </p>
                </div>
              </div>

              {/* Benefits Grid with Icons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-50 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Easy Registration"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-sky-800">
                    Easy Registration
                  </span>
                </div>

                <div className="bg-sky-50 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Quality Products"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-sky-800">
                    Quality Products
                  </span>
                </div>

                <div className="bg-sky-50 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Business Benefits"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-sky-800">
                    Business Benefits
                  </span>
                </div>

                <div className="bg-sky-50 rounded-xl p-4 text-center border border-sky-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Growth Opportunities"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-sky-800">
                    Growth Opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Highlights with Images */}
            <div className="space-y-6">
              {/* Lifestyle Value Card */}
              <div className="relative bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white text-center shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&h=200&q=80"
                  alt="Quality Lifestyle"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">QUALITY LIFESTYLE</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-xl font-semibold">
                      Everyday Products • Real Value
                    </span>
                  </div>
                </div>
              </div>

              {/* Growth & Vision Card */}
              <div className="relative bg-gradient-to-br from-teal-500 to-sky-600 rounded-2xl p-6 text-center text-white shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&h=200&q=80"
                  alt="Team Growth"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-3 tracking-wide">
                    GROWTH • ACTION • VISION
                  </h4>
                  <div className="flex justify-center space-x-2 mt-4 flex-wrap">
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      🚀 Action
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      📈 Growth
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      ⭐ Progress
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      👁️ Vision
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-sky-50 rounded-2xl p-6 border border-sky-200 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-gray-600 mb-4">
                    Begin your journey with a structured opportunity
                  </p>
                  <a
                    href="https://www.qweezzot.co.in"
                    className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Get Started Today
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Website Link Footer with Pattern */}
          <div className="bg-gray-50 border-t border-gray-200 py-6 text-center relative">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: "cover",
              }}
            ></div>
            <a
              href="https://www.myosfigo.co.in"
              className="relative z-10 text-sky-600 hover:text-sky-700 font-semibold text-lg underline decoration-2 decoration-sky-400 hover:decoration-sky-600 transition-all"
            >
              www.qweezzot.co.in
            </a>
          </div>
        </div>

        {/* Additional Features Section with Images */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&h=150&q=80"
              alt="Everyday Products"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-sky-800 mb-2">Everyday Products</h5>
            <p className="text-sm text-gray-600">
              Quality products designed for daily lifestyle needs
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&h=150&q=80"
              alt="Business Opportunity"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-sky-800 mb-2">
              Business Opportunity
            </h5>
            <p className="text-sm text-gray-600">
              Participate in a structured, performance-based platform
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=200&h=150&q=80"
              alt="Community Growth"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-sky-800 mb-2">Community Growth</h5>
            <p className="text-sm text-gray-600">
              Grow together with a supportive and transparent network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCard;
