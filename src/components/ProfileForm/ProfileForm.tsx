import { useForm } from 'react-hook-form';
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { useState } from "react";
import './ProfileForm.css';
import { ProfileFormData } from "../../types/ProfileFormData";

type Props = {
    onComplete: (data: ProfileFormData) => void;
    email: string;
    phone: string;
};

const ProfileForm = ({ onComplete, phone, email }: Props) => {
    const { register, handleSubmit, trigger, formState: { errors } } = useForm<ProfileFormData>();
    const [step, setStep] = useState(1);

    const nextStep = async () => {
        const valid = await trigger();
        if (valid) {
            setStep(prev => prev + 1);
        }
    };

    const onSubmit = (data: ProfileFormData) => {
        onComplete(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="progress-bar"><ProgressBar currentStep={step} /></div>

            <div className="form-info-text">
                <h2 className="title">Profile info</h2>
                <p className="description">
                    Fill in the data for profile. It will take a couple of minutes.<br />
                    You only need a passport
                </p>
            </div>

            {step === 1 && (
                <div className="profile-step">
                    <div className="col-group">
                        <label className="terms-block">
                            <input
                                type="checkbox"
                                {...register("terms", { required: true })}
                            />
                            <span>I agree with <a href="#" className="link-text">Terms of use</a></span>
                        </label>
                        {errors.terms && (
                            <p className="error">You must agree to the terms of use</p>
                        )}
                    </div>

                    <div className="form-input-group">
                        <div className="col-group">
                            <p className="info-title">Personal data</p>
                            <p className="subtext-ligt">Specify exactly as in your passport</p>
                        </div>
                        <div className="col-group">
                            <label className="label">First name</label>
                            <input
                                type="text"
                                className="input input-full"
                                {...register('firstName', { required: true })}
                            />
                            {errors.firstName && <p className="error">First name is required</p>}
                        </div>
                        <div className="col-group">
                            <label className="label">Second name</label>
                            <input
                                type="text"
                                className="input input-full"
                                {...register('secondName', { required: true })}
                            />
                            {errors.secondName && <p className="error">Second name is required</p>}
                        </div>
                        <div className="col-group">
                            <div className="inputGroup">
                                <div className="col-select">
                                    <label className="label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="input input-full"
                                        {...register('dateOfBirth', { required: true })}
                                    />
                                    {errors.dateOfBirth && <p className="error">Date of birth is required</p>}
                                </div>
                                <div className="col-select">
                                    <label className="label">Place of Birth</label>
                                    <select
                                        className="select"
                                        {...register('placeOfBirth', { required: true })}
                                    >
                                        <option value="">Select country</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="US">United States</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="IT">Italy</option>
                                        <option value="ES">Spain</option>
                                        <option value="PL">Poland</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                        <option value="JP">Japan</option>
                                        <option value="CN">China</option>
                                        <option value="IN">India</option>
                                        <option value="BR">Brazil</option>
                                        <option value="MX">Mexico</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="AR">Argentina</option>
                                        <option value="CH">Switzerland</option>
                                    </select>
                                    {errors.placeOfBirth && <p className="error">Place of birth is required</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="itin-preview-box">
                        <span className="text-18">
                            123-45-678
                        </span>
                        <div className="subtext">
                            <img src="/assets/img/check-icon.svg" alt="edit" />
                            <span>Your ITIN</span>
                        </div>
                    </div>
                    <button type="button" className="button" onClick={nextStep}>
                        Go Next <img src="/assets/img/arrow.svg" alt="arrow" />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="profile-step">
                    <div className="form-input-group">
                        <div className="col-group">
                            <p className="info-title">Contacts</p>
                            <p className="subtext-ligt">These contacts are used to inform about orders</p>
                        </div>
                        <div className="col-group">
                            <div className="contact-block">
                                <img src="/assets/img/email-icon.svg" alt="email" />
                                {email}
                            </div>
                        </div>
                        <div className="col-group">
                            <div className="contact-block">
                                <img src="/assets/img/phone-icon.svg" alt="phone" />
                                {phone}
                            </div>
                        </div>
                        <div className="col-group">
                            <p className="info-title">Social network</p>
                            <p className="subtext-ligt">Indicate the desired communication method</p>
                        </div>
                        <div className="col-group">
                            <div className="inputGroup">
                                <div className="col-select">
                                    <select
                                        className="select"
                                        {...register('socialNetwork', { required: true })}
                                    >
                                        <option value="">Social Network</option>
                                        <option value="Skype">Skype</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Linkedin">Linkedin</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Telegram">Telegram</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="TikTok">TikTok</option>
                                    </select>
                                    {errors.socialNetwork && <p className="error">Social Network is required</p>}
                                </div>
                                <div className="col-group">
                                    <input
                                        type="text"
                                        placeholder="@profile"
                                        className="input input-full"
                                        {...register('profile', {
                                            required: 'Profile is required',
                                            pattern: {
                                                value: /^@.+$/,
                                                message: 'Profile must start with @',
                                            },
                                        })}
                                    />
                                    {errors.profile && <p className="error">{errors.profile.message?.toString()}</p>}
                                </div>
                            </div>
                        </div>
                        <button type="button" className="button no-borders-btn">
                            <img src="/assets/img/add-more-button.svg" alt="add-mpre" />
                        </button>
                    </div>
                    <button type="button" className="button" onClick={nextStep}>
                        Go Next <img src="/assets/img/arrow.svg" alt="arrow" />
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="profile-step">
                    <div className="form-input-group">
                        <div className="col-group">
                            <p className="info-title">Delivery address</p>
                            <p className="subtext-ligt">Used for shipping orders</p>
                        </div>
                        <div className="col-group">
                            <label className="label">Address</label>
                            <input
                                type="text"
                                className="input input-full"
                                {...register('address', { required: true })}
                            />
                            {errors.address && <p className="error">Address is required</p>}
                        </div>
                        <div className="col-select">
                            <label className="label">City</label>
                            <select
                                className="select"
                                {...register('city', { required: true })}
                            >
                                <option value="">Select city</option>
                                <option value="Kyiv">Kyiv</option>
                                <option value="Washington">Washington</option>
                                <option value="London">London</option>
                                <option value="Berlin">Berlin</option>
                                <option value="Paris">Paris</option>
                                <option value="Rome">Rome</option>
                                <option value="Madrid">Madrid</option>
                                <option value="Warsaw">Warsaw</option>
                                <option value="Ottawa">Ottawa</option>
                                <option value="Canberra">Canberra</option>
                                <option value="Tokyo">Tokyo</option>
                                <option value="Beijing">Beijing</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Brasília">Brasília</option>
                                <option value="Mexico City">Mexico City</option>
                                <option value="Pretoria">Pretoria</option>
                                <option value="Abuja">Abuja</option>
                                <option value="Buenos Aires">Buenos Aires</option>
                                <option value="Bern">Bern</option>
                            </select>
                            {errors.city && <p className="error">City is required</p>}
                        </div>
                        <div className="col-group">
                            <div className="inputGroup">
                                <div className="col-select">
                                    <label className="label">Country</label>
                                    <select
                                        className="select"
                                        {...register('country', { required: true })}
                                    >
                                        <option value="">Select country</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="US">United States</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="IT">Italy</option>
                                        <option value="ES">Spain</option>
                                        <option value="PL">Poland</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                        <option value="JP">Japan</option>
                                        <option value="CN">China</option>
                                        <option value="IN">India</option>
                                        <option value="BR">Brazil</option>
                                        <option value="MX">Mexico</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="AR">Argentina</option>
                                        <option value="CH">Switzerland</option>
                                    </select>
                                    {errors.country && <p className="error">Country is required</p>}
                                </div>
                                <div className="col-group">
                                    <label className="label">Zip Code</label>
                                    <input
                                        type="number"
                                        className="input input-full"
                                        placeholder=" — — — —"
                                        {...register('zipCode', {
                                            required: "Zip Code is required",
                                            validate: (value) => {
                                                if (value.toString().length !== 4) return "Zip code must be 4 digits";
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors.zipCode && <p className="error">{errors.zipCode.message?.toString()}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="col-group">
                            <label className="label">Optional</label>
                            <input
                                type="text"
                                className="input input-full"
                                {...register('optional', { required: false })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="button primary-btn">
                        <img src="/assets/img/white-check-icon.svg" alt="check" /> Save
                    </button>
                </div>
            )}
        </form>
    );
};

export default ProfileForm;