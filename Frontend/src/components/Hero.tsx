

const Hero = () => {
  return (
    <section className="relative bg-blue-50 pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Available 24/7 for Emergencies
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Your Health is</span>
              <span className="block text-blue-600">Our Top Priority</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. We are dedicated to providing compassionate care for you and your family.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all">
                  Book Appointment
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
              {/* Placeholder for a hero image. In a real app, this would be a proper img tag. */}
              <div className="relative block w-full bg-blue-200 h-96 sm:h-[500px] lg:h-[600px]">
                <img
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80"
                  alt="Doctor with patient"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
