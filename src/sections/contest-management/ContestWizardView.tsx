import { ContestWizard } from './components/ContestWizard'
import { useState } from 'react'

export default function ContestWizardPreview() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <ContestWizard
      currentStep={currentStep}
      onStepChange={(step) => setCurrentStep(step)}
      onComplete={(contest) => console.log('Contest created:', contest)}
      onCancel={() => console.log('Wizard cancelled')}
    />
  )
}
