import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './RegistrationForm.css';
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { RegistrationFormData } from "../../types/RegistarationFormData";

type RegistrationFormProps = {
    onComplete: (data: RegistrationFormData) => void;
};

const RegistrationForm = ({ onComplete }: RegistrationFormProps) => {
    const { register, handleSubmit, trigger, formState: { errors }, watch } = useForm<RegistrationFormData>();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const nextStep = async () => {
        const valid = await trigger();
        if (valid) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => setStep(prev => prev - 1);

    const onSubmit = (data: RegistrationFormData) => {
        onComplete(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <ProgressBar currentStep={step} />

            <div className="form-info-text">
                <h2 className="title">Registration</h2>
                <p className="description">
                    Fill in the registration data. It will take a couple of minutes. <br />
                    All you need is a phone number and e-mail
                </p>
            </div>

            {step === 1 && (
                <div className="registration-step">
                    <div className="privacy-info">
                        <img src="/assets/img/lock.svg" alt="lock" className="lock" />
                        <p>We take privacy issues seriously. You can be sure that your personal data is securely protected.</p>
                        <img src="/assets/img/close-small-icon.svg" alt="close" className="lock" />
                    </div>
                    <div className="form-input-group">
                        <label className="label">Enter your phone number</label>
                        <div className="inputGroup">
                            <select className="select" {...register('countryCode')}>
                                <option value="+1">+1</option>
                                <option value="+380">+380</option>
                                <option value="+44">+44</option>
                                <option value="+49">+49</option>
                            </select>
                            <input
                                type="text"
                                className="input"
                                placeholder="555 555-123"
                                {...register('phone', {
                                    required: true,
                                    pattern: /^[0-9 -]+$/,
                                    validate: value => {
                                        const digits = value.replace(/\D/g, '');
                                        return digits.length === 9 || "Phone must contain exactly 9 digits";
                                    }
                                })}
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/[^0-9 -]/g, '');
                                }}
                            />
                        </div>
                        {errors.phone && <p className="error">{errors.phone.message?.toString() || "Phone is required"}</p>}
                    </div>
                    <button type="button" className="button" onClick={nextStep}>
                        Send Code
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="registration-step">
                    <div className="phone-preview-box">
                        <span className="phone-text">
                            {watch("countryCode") || "1"} {watch("phone") || "___ ___-____"}
                        </span>
                        <span className="subtext">Number not confirmed yet</span>
                        <button type="button" className="edit-button" onClick={prevStep}>
                            <img src="/assets/img/edit-icon.svg" alt="edit" />
                        </button>
                    </div>
                    <div className="confirmation-form-blocks">
                        <div className="form-block">
                            <label className="label">Confirmation code</label>
                            <input
                                type="number"
                                className="input input-code"
                                placeholder=" ————"
                                {...register('code', {
                                    required: true,
                                    validate: (value) => {
                                        if (value.length !== 4) return "Code must be 4 digits";
                                        return true;
                                    }
                                })}
                            />
                            <p className="helper-text">Confirm phone number with code from SMS message</p>
                        </div>
                        <button type="button" className="send-again-button">
                            <img src="/assets/img/send-again-button.svg" alt="send again" />
                        </button>
                    </div>
                    {errors.code && <p className="error">{errors.code.message?.toString() || "Code is required"}</p>}
                    <button type="button" className="button" onClick={nextStep}>
                        Confirm
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="registration-step">
                    <div className="phone-preview-box">
                        <span className="phone-text">
                            {watch("countryCode") || "1"} {watch("phone") || "___ ___-____"}
                        </span>
                        <div className="subtext">
                            <img src="/assets/img/check-icon.svg" alt="edit" />
                            <span>Number confirmed</span>
                        </div>
                    </div>
                    <div className="form-input-group">
                        <div className="col-group">
                            <label className="label">Enter your email</label>
                            <input
                                type="email"
                                className="input input-full"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <p className="error">Email is required</p>}
                        </div>
                        <div className="col-group">
                            <label className="label">Set a password</label>
                            <div className="input-with-btn">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-full input-password"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                            message: "Password must contain at least one uppercase letter and one number"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="eye-button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    <img
                                        src="/assets/img/eye-icon.svg"
                                        alt="toggle password"
                                    />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="error">{errors.password.message?.toString()}</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="button primary-btn">
                        Register Now
                    </button>
                </div>
            )}
        </form>
    );
};

export default RegistrationForm;
