const MarketingCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-teal-50 py-12 px-4 font-sans">
      <div className="max-w-full mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-200 mb-8">
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-900/50"></div>
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
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-100 mb-2 drop-shadow-md">
                Osfigo
              </h2>
              <div className="w-24 h-1 bg-blue-300 mx-auto mt-6 rounded-full"></div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Text Content with Side Image */}
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Healthy Lifestyle"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  />
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex-1">
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    There is nothing more important than a happy healthy life
                    where your dreams come true with time and effort.{" "}
                    <span className="font-semibold text-blue-700">
                      Now is the time to start living your dreams.
                    </span>
                  </p>

                  <p className="text-lg leading-relaxed text-gray-700">
                    We provide you a platform to stay healthy with high quality
                    health products along with a sustainable income plan. Add
                    another source of income by becoming a direct sales
                    associate and promoting healthy living.
                  </p>
                </div>
              </div>

              {/* Benefits Grid with Icons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Free Joining"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-blue-800">
                    Free Joining
                  </span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Discounted Products"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-blue-800">
                    Discounted Products
                  </span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1563013541-5b0c0a8258f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Retail Benefits"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-blue-800">
                    Retail Benefits
                  </span>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200 hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&h=50&q=80"
                    alt="Career Plans"
                    className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                  />
                  <span className="text-sm font-semibold text-blue-800">
                    Career Plans
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Highlights with Images */}
            <div className="space-y-6">
              {/* Health is Wealth Card with Image */}
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80"
                  alt="Health is Wealth"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">HEALTH IS WEALTH</h3>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-xl font-semibold">
                      30% Off Well-being Social Life™
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Plan Card with Team Image */}
              <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-6 text-center text-white shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80"
                  alt="Success Team"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-3 tracking-wide">
                    SUCCESS ACTION PLAN GOAL VISION
                  </h4>
                  <div className="flex justify-center space-x-2 mt-4 flex-wrap">
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      🚀 Action
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      🎯 Plan
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      ⭐ Goal
                    </span>
                    <span className="bg-white/30 px-3 py-1 rounded-full text-sm mb-2">
                      👁️ Vision
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Section with Product Image */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 text-center relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547592188-8358c39392ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150&q=80"
                  alt="Health Products"
                  className="absolute right-0 bottom-0 w-24 h-24 object-cover opacity-20"
                />
                <div className="relative z-10">
                  <p className="text-gray-600 mb-4">Start your journey today</p>
                  <a
                    href="https://www.myosfigo.co.in"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Join Now - Free
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
              className="relative z-10 text-blue-600 hover:text-blue-700 font-semibold text-lg underline decoration-2 decoration-blue-400 hover:decoration-blue-600 transition-all"
            >
              www.myosfigo.co.in
            </a>
          </div>
        </div>

        {/* Additional Features Section with Images */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150&q=80"
              alt="Natural Products"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-blue-800 mb-2">Natural Products</h5>
            <p className="text-sm text-gray-600">
              100% organic and natural health solutions
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150&q=80"
              alt="Income Opportunity"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-blue-800 mb-2">Income Opportunity</h5>
            <p className="text-sm text-gray-600">
              Build sustainable income streams
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center group hover:shadow-xl transition-all">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150&q=80"
              alt="Community"
              className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
            />
            <h5 className="font-bold text-blue-800 mb-2">Community</h5>
            <p className="text-sm text-gray-600">
              Join like-minded wellness enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCard;
