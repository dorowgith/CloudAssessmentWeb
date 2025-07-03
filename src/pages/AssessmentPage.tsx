import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react'

interface Question {
  id: string
  category: string
  question: string
  type: 'multiple-choice' | 'yes-no' | 'scale'
  options?: string[]
  weight: number
}

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const questions: Question[] = [
    {
      id: 'cloud-provider',
      category: 'Infrastructure',
      question: 'Which cloud provider(s) are you currently using?',
      type: 'multiple-choice',
      options: ['AWS', 'Azure', 'Google Cloud', 'Multi-cloud', 'Other'],
      weight: 1
    },
    {
      id: 'security-monitoring',
      category: 'Security',
      question: 'Do you have continuous security monitoring in place?',
      type: 'yes-no',
      weight: 3
    },
    {
      id: 'backup-strategy',
      category: 'Data Management',
      question: 'How would you rate your current backup and disaster recovery strategy?',
      type: 'scale',
      options: ['Poor', 'Fair', 'Good', 'Excellent'],
      weight: 2
    },
    {
      id: 'cost-monitoring',
      category: 'Cost Management',
      question: 'Do you actively monitor and optimize cloud costs?',
      type: 'yes-no',
      weight: 2
    },
    {
      id: 'compliance-requirements',
      category: 'Compliance',
      question: 'Which compliance frameworks do you need to adhere to?',
      type: 'multiple-choice',
      options: ['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001', 'PCI DSS', 'None'],
      weight: 2
    },
    {
      id: 'automation-level',
      category: 'Operations',
      question: 'How would you rate your infrastructure automation level?',
      type: 'scale',
      options: ['Manual', 'Partially Automated', 'Mostly Automated', 'Fully Automated'],
      weight: 2
    }
  ]

  const categories = [...new Set(questions.map(q => q.category))]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Assessment complete, navigate to results
      navigate('/results', { state: { answers, questions } })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id]
  const isAnswered = currentAnswer !== undefined

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  currentAnswer === option
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {currentAnswer === option && (
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )

      case 'yes-no':
        return (
          <div className="grid grid-cols-2 gap-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(currentQuestion.id, option === 'Yes')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  currentAnswer === (option === 'Yes')
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    option === 'Yes' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {option === 'Yes' ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, index + 1)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  currentAnswer === index + 1
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-secondary-500">{index + 1}/4</span>
                    {currentAnswer === index + 1 && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-secondary-900">Cloud Assessment</h1>
            <span className="text-sm text-secondary-600">
              Question {currentStep + 1} of {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card mb-8 animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {currentQuestion.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-secondary-900">
              {currentQuestion.question}
            </h2>
          </div>

          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? 'bg-primary-600'
                    : index < currentStep
                    ? 'bg-primary-300'
                    : 'bg-secondary-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssessmentPage