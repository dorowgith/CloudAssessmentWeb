import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, BarChart3, CheckCircle } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Security Assessment',
      description: 'Comprehensive security evaluation of your cloud infrastructure and configurations.'
    },
    {
      icon: Zap,
      title: 'Performance Analysis',
      description: 'Analyze performance metrics and identify optimization opportunities.'
    },
    {
      icon: BarChart3,
      title: 'Cost Optimization',
      description: 'Discover cost-saving opportunities and resource optimization strategies.'
    }
  ]

  const benefits = [
    'Automated cloud infrastructure scanning',
    'Real-time security vulnerability detection',
    'Performance bottleneck identification',
    'Cost optimization recommendations',
    'Compliance framework mapping',
    'Detailed reporting and analytics'
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Cloud Assessment
              <span className="block text-primary-200">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up">
              Comprehensive cloud infrastructure assessment platform that helps you optimize security, 
              performance, and costs across your cloud environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/assessment"
                className="btn btn-primary bg-white text-primary-700 hover:bg-primary-50 px-8 py-3 text-lg font-semibold inline-flex items-center"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 px-8 py-3 text-lg font-semibold"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Comprehensive Cloud Analysis
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our platform provides deep insights into your cloud infrastructure 
              with automated assessments and actionable recommendations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Why Choose CloudAssess?
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Our platform combines industry best practices with cutting-edge technology 
                to deliver comprehensive cloud assessments that drive real business value.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-secondary-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                  <BarChart3 className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-secondary-600 mb-6">
                  Begin your cloud assessment journey today and unlock the full potential of your infrastructure.
                </p>
                <Link
                  to="/assessment"
                  className="btn btn-primary px-6 py-3 w-full"
                >
                  Start Your Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage