import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ProfileForm from './components/ProfileForm/ProfileForm';
import './FormPage.css';
import './index.css';
import { UserData } from "./types/UserData";
import { RegistrationFormData } from "./types/RegistarationFormData";
import { ProfileFormData } from "./types/ProfileFormData";

const FormPage = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<Partial<UserData>>({});

    const handleRegistrationComplete = (data: RegistrationFormData) => {
        setUserData((prev: any) => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleProfileComplete = (data: ProfileFormData) => {
        const finalData = { ...userData, ...data };
        setUserData(finalData);
        console.log('User Data:', finalData);
        setStep(3);
    };

    return (
        <div className="container">
            <div className="header">
                <img src="/assets/img/company-logo.svg" alt="company-logo" className="company-logo"/>
                <img src="/assets/img/close-button.svg" alt="close-button" className="close-button"/>
            </div>
            {step === 1 && <RegistrationForm onComplete={handleRegistrationComplete}/>}
            {step === 2 && <ProfileForm onComplete={handleProfileComplete} email={userData.email!} phone={userData.phone!}/>}
            {step === 3 && (
                <div className="success-message-container">
                    <h2 className='title'>Thank you!</h2>
                    <p className="description">Your data has been successfully saved.</p>
                    <img src="/assets/img/check-box.svg" alt="success" className="success-icon" />
                </div>
            )}
        </div>
    );
};

export default FormPage;