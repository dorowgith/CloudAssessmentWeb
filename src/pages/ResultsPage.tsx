import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { BarChart3, Shield, Zap, DollarSign, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react'

interface ResultData {
  category: string
  score: number
  maxScore: number
  status: 'excellent' | 'good' | 'fair' | 'poor'
  recommendations: string[]
}

const ResultsPage: React.FC = () => {
  const location = useLocation()
  const { answers, questions } = location.state || {}

  // Calculate results based on answers
  const calculateResults = (): ResultData[] => {
    if (!answers || !questions) return []

    const categories = [...new Set(questions.map((q: any) => q.category))]
    
    return categories.map(category => {
      const categoryQuestions = questions.filter((q: any) => q.category === category)
      let totalScore = 0
      let maxScore = 0

      categoryQuestions.forEach((q: any) => {
        const answer = answers[q.id]
        maxScore += q.weight * 4 // Assuming max score of 4 per question

        if (answer !== undefined) {
          let score = 0
          if (q.type === 'yes-no') {
            score = answer ? 4 : 1
          } else if (q.type === 'scale') {
            score = answer
          } else if (q.type === 'multiple-choice') {
            // Simple scoring for multiple choice
            score = 3
          }
          totalScore += score * q.weight
        }
      })

      const percentage = (totalScore / maxScore) * 100
      let status: 'excellent' | 'good' | 'fair' | 'poor'
      
      if (percentage >= 80) status = 'excellent'
      else if (percentage >= 60) status = 'good'
      else if (percentage >= 40) status = 'fair'
      else status = 'poor'

      return {
        category,
        score: totalScore,
        maxScore,
        status,
        recommendations: getRecommendations(category, status)
      }
    })
  }

  const getRecommendations = (category: string, status: string): string[] => {
    const recommendations: Record<string, Record<string, string[]>> = {
      'Security': {
        'poor': ['Implement multi-factor authentication', 'Set up continuous security monitoring', 'Conduct regular security audits'],
        'fair': ['Enhance access controls', 'Implement automated security scanning', 'Review security policies'],
        'good': ['Fine-tune security configurations', 'Implement advanced threat detection'],
        'excellent': ['Maintain current security posture', 'Consider zero-trust architecture']
      },
      'Infrastructure': {
        'poor': ['Implement infrastructure as code', 'Set up proper monitoring', 'Establish backup procedures'],
        'fair': ['Optimize resource allocation', 'Implement auto-scaling', 'Review architecture design'],
        'good': ['Fine-tune performance settings', 'Implement advanced monitoring'],
        'excellent': ['Maintain current infrastructure', 'Consider edge computing options']
      },
      'Cost Management': {
        'poor': ['Implement cost monitoring tools', 'Review resource utilization', 'Set up budget alerts'],
        'fair': ['Optimize instance sizes', 'Implement reserved instances', 'Review storage costs'],
        'good': ['Fine-tune auto-scaling policies', 'Implement spot instances'],
        'excellent': ['Maintain cost optimization', 'Consider advanced pricing models']
      }
    }

    return recommendations[category]?.[status] || ['Review current practices', 'Consult with experts']
  }

  const results = calculateResults()
  const overallScore = results.reduce((sum, r) => sum + (r.score / r.maxScore), 0) / results.length * 100

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'good': return <CheckCircle className="h-5 w-5 text-blue-600" />
      case 'fair': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'poor': return <XCircle className="h-5 w-5 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-secondary-600 bg-secondary-50 border-secondary-200'
    }
  }

  if (!answers || !questions) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">No Assessment Data Found</h1>
          <p className="text-secondary-600 mb-6">Please complete an assessment first.</p>
          <Link to="/assessment" className="btn btn-primary">
            Start Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Assessment Results</h1>
          <p className="text-lg text-secondary-600">
            Your cloud infrastructure assessment is complete. Here's your detailed analysis.
          </p>
        </div>

        {/* Overall Score */}
        <div className="card mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
            <BarChart3 className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">Overall Score</h2>
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {Math.round(overallScore)}%
          </div>
          <p className="text-secondary-600">
            {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : overallScore >= 40 ? 'Fair' : 'Needs Improvement'}
          </p>
        </div>

        {/* Category Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {results.map((result, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">{result.category}</h3>
                {getStatusIcon(result.status)}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-secondary-600 mb-1">
                  <span>Score</span>
                  <span>{Math.round((result.score / result.maxScore) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                  />
                </div>
              </div>

              <div className={`px-3 py-2 rounded-md border ${getStatusColor(result.status)}`}>
                <span className="text-sm font-medium capitalize">{result.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-secondary-900">Recommendations</h2>
          
          {results.map((result, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                {getStatusIcon(result.status)}
                <span className="ml-2">{result.category}</span>
              </h3>
              
              <ul className="space-y-2">
                {result.recommendations.map((rec, recIndex) => (
                  <li key={recIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-secondary-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary inline-flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </button>
          <Link to="/assessment" className="btn btn-outline">
            Retake Assessment
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage