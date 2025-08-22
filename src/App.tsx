import React, { useRef } from 'react';
import Hero from './components/Hero';
import logo from "./assets/img/logo-white.png";
import MultiStepForm from './components/MultiStepForm';
import { GraduationCap, Clock, Shield, Users, Star, CheckCircle } from 'lucide-react';

function App() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero onGetStarted={scrollToForm} />

      {/* Social Proof Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join 500+ Students Who've Made It to the UK
            </h2>
            <p className="text-lg text-gray-600">
              Real results from real students who chose the Sojilearn path
            </p>
          </div>

          {/* Testimonials */}
          <section id="success-stories">
            <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Leonard O.</h4>
                  <p className="text-sm text-gray-600">Preparing to travel for September 2025 intake</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I was having difficulties drafting statement of purpose, but Sojilearn assisted me with everything as well as drafting a professional resume based on my background."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Comfort O.</h4>
                  <p className="text-sm text-gray-600">Expert support for MRes application</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I needed an MRes course to travel with my husband, thankfully I came across Sojilearn and got admission into MRes Operations Management at University of Gloucesteshire."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Becky T.</h4>
                  <p className="text-sm text-gray-600">Now studying at Coventry University</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The process was so smooth. No stress, no confusion. Sojilearn handled everything professionally, and provided accommodation support before I arrived UK."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Ekpo O.</h4>
                  <p className="text-sm text-gray-600">Preparing for study in January 2026.</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I needed an agency that could help me process admission, as well provide tailored guidance each step of the application process. Sojilearn came through for me."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  I
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Igbanam Y.</h4>
                  <p className="text-sm text-gray-600">Preparing towards January 2026 intake</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I completed my UG in Benin Replublic. With Sojilearn's expert guidance, I was able to secure a place in a Top UK university."
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Temitayo O.</h4>
                  <p className="text-sm text-gray-600">My expectations were exceeded</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I reached out to Sojilearn, to help secure admission in the UK. I was able to secure 3 offers from London Metropolitan University, Edinburgh Napier University and Anglia Rustin University."
              </p>
            </div>
          </div>
          </section>
        </div>
      </div>

      {/* Why Choose Sojilearn */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Sojilearn?
            </h2>
            <p className="text-lg text-gray-600">
              We make studying in the UK faster, simpler, and stress-free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Super Fast</h3>
              <p className="text-gray-600">Get results in weeks, not months. Our streamlined process cuts through the red tape.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stress-Free</h3>
              <p className="text-gray-600">No confusing paperwork or endless back-and-forth. We handle the complexity for you.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Our experienced counselors know exactly what UK universities want.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">98% success rate with students now studying at top UK universities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Start Your UK Journey?
          </h2>
          <p className="text-lg text-gray-600">
            Fill out our quick form and get personalized guidance within 24 hours
          </p>
        </div>
        <MultiStepForm />
      </div>

      {/* Stats */}
      <div className="bg-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-4">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Students Successfully Placed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3x</h3>
              <p className="text-gray-600">Faster Than Traditional Methods</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
         </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} className="logo" width="100" height="50" alt="Sojilearn logo" />
              </div>
              <p className="text-gray-400">
                Making UK education accessible, fast, and stress-free for Nigerian students.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.sojilearn.com/about" className="hover:text-white transition-colors" rel="noopener noreferrer">About Us</a></li>
                <li><a href="https://www.sojilearn.com" className="hover:text-white transition-colors" rel="noopener noreferrer">Services</a></li>
                <li><a href="/#success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="mailto:sojilearn@gmail.com" className="hover:text-white transition-colors" rel="noopener noreferrer">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 sojilearn@gmail.com</p>
                <p>📱 +234 (813) 780 6643</p>
                <p>🌐 www.sojilearn.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2022 - 2025 Sojilearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;