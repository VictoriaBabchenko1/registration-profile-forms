import './ProgressBar.css';

type StepIndicatorProps = {
    currentStep: number;
};

const stepImages = [
    '/assets/img/progress-step-1.svg',
    '/assets/img/progress-step-2.svg',
    '/assets/img/progress-step-3.svg',
];

export const ProgressBar: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    return (
        <div className="progress-bar-wrapper">
            <img
                src={stepImages[currentStep-1]}
                alt={`step-${currentStep + 1}`}
                className="progress-bar"
            />
        </div>
    );
};
