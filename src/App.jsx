import React, { useState } from 'react';

const TOTAL_STEPS = 4;
const WEB3FORMS_KEY = "a0f55f76-e0d7-4511-98e6-6b0469e088ba";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    hasDegree: '',
    hasLaptop: '',
    laptopSpecs: '',
    isComputerLiterate: '',
    cvLink: '',
    available12h: '',
    hasBackupPower: '',
    canFollowInstructions: '',
    hasRemoteExperience: '',
    budget: '',
    availableFunds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email address';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    }
    if (step === 2) {
      if (!formData.hasDegree) newErrors.hasDegree = 'Please select an option';
      if (!formData.hasLaptop) newErrors.hasLaptop = 'Please select an option';
      if (!formData.isComputerLiterate) newErrors.isComputerLiterate = 'Please select an option';
      if (!formData.cvLink.trim()) {
        newErrors.cvLink = 'Please paste the Google Drive link to your CV';
      } else if (!/^https?:\/\/.+/.test(formData.cvLink.trim())) {
        newErrors.cvLink = 'Please enter a valid URL starting with https://';
      }
    }
    if (step === 3) {
      if (!formData.available12h) newErrors.available12h = 'Please select an option';
      if (!formData.hasBackupPower) newErrors.hasBackupPower = 'Please select an option';
      if (!formData.canFollowInstructions) newErrors.canFollowInstructions = 'Please select an option';
    }
    if (step === 4) {
      if (!formData.hasRemoteExperience) newErrors.hasRemoteExperience = 'Please select an option';
      if (!formData.budget) newErrors.budget = 'Please select your budget range';
      if (!formData.availableFunds || formData.availableFunds < 0)
        newErrors.availableFunds = 'Please enter the amount you have available';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(currentStep) && currentStep < TOTAL_STEPS) {
      setCurrentStep(s => s + 1);
    }
  };

  const prev = () => setCurrentStep(s => Math.max(1, s - 1));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setSubmitting(true);
    const data = new FormData();
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `New Job Application - ${formData.fullName}`);
    data.append("from_name", formData.fullName);

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        setSucceeded(true);
      } else {
        alert("Error: " + (result.message || "Something went wrong"));
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderFooter = () => (
    <footer
      style={{
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#6b7280'
      }}
    >
      Design by{' '}
      <a
        href="https://newmanukpakacom.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
      >
        NewMan
      </a>
    </footer>
  );

  const progress = ((currentStep - 1) / TOTAL_STEPS) * 100;

  if (succeeded) {
    return (
      <div className="container">
        <div className="card">
          <div className="success">
            <div className="success-icon">✓</div>
            <h2>Application Received</h2>
            <p>Thank you for applying. We will review your submission and contact you if you meet our requirements.</p>
          </div>
          {renderFooter()}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Application Form</h1>
        <p className="subtitle">Please complete all sections carefully. We review every submission.</p>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="step-label">Step {currentStep} of {TOTAL_STEPS}</div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
              {errors.fullName && <div className="error">{errors.fullName}</div>}
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              <div className="hint">We'll use this to contact you about your application.</div>
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 ..." />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>
          </div>

          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="field">
              <label>Do you hold a university degree or equivalent qualification?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.hasDegree === v ? 'selected' : ''}`}>
                    <input type="radio" name="hasDegree" value={v} checked={formData.hasDegree === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.hasDegree && <div className="error">{errors.hasDegree}</div>}
            </div>

            <div className="field">
              <label>Do you currently own a laptop computer?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.hasLaptop === v ? 'selected' : ''}`}>
                    <input type="radio" name="hasLaptop" value={v} checked={formData.hasLaptop === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.hasLaptop && <div className="error">{errors.hasLaptop}</div>}
            </div>

            {formData.hasLaptop === 'Yes' && (
              <div className="field">
                <label>Laptop Make, Model & Key Specifications</label>
                <textarea name="laptopSpecs" value={formData.laptopSpecs} onChange={handleChange} placeholder="e.g. HP Pavilion, Intel Core i5, 8GB RAM, 256GB SSD" />
                <div className="hint">Please include processor, RAM, and storage if possible.</div>
              </div>
            )}

            <div className="field">
              <label>Are you computer literate?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.isComputerLiterate === v ? 'selected' : ''}`}>
                    <input type="radio" name="isComputerLiterate" value={v} checked={formData.isComputerLiterate === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.isComputerLiterate && <div className="error">{errors.isComputerLiterate}</div>}
            </div>

            <div className="field">
              <label>CV / Resume (Google Drive Link)</label>
              <input
                type="text"
                name="cvLink"
                value={formData.cvLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/..."
              />
              <div className="hint">
                Upload your CV to Google Drive, set access to <strong>"Anyone with the link"</strong>, and paste the link here.
              </div>
              {errors.cvLink && <div className="error">{errors.cvLink}</div>}
            </div>
          </div>

          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <div className="field">
              <label>Are you available to work up to 12 hours per day?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.available12h === v ? 'selected' : ''}`}>
                    <input type="radio" name="available12h" value={v} checked={formData.available12h === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.available12h && <div className="error">{errors.available12h}</div>}
            </div>

            <div className="field">
              <label>Do you have a reliable backup power source (generator, inverter, or UPS) to avoid interruptions?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.hasBackupPower === v ? 'selected' : ''}`}>
                    <input type="radio" name="hasBackupPower" value={v} checked={formData.hasBackupPower === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.hasBackupPower && <div className="error">{errors.hasBackupPower}</div>}
            </div>

            <div className="field">
              <label>Are you able to carefully listen to and follow detailed instructions?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.canFollowInstructions === v ? 'selected' : ''}`}>
                    <input type="radio" name="canFollowInstructions" value={v} checked={formData.canFollowInstructions === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.canFollowInstructions && <div className="error">{errors.canFollowInstructions}</div>}
            </div>
          </div>

          <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
            <div className="field">
              <label>Do you have prior experience with remote work or earning income online?</label>
              <div className="radio-group">
                {['Yes', 'No'].map(v => (
                  <label key={v} className={`radio-item ${formData.hasRemoteExperience === v ? 'selected' : ''}`}>
                    <input type="radio" name="hasRemoteExperience" value={v} checked={formData.hasRemoteExperience === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
              {errors.hasRemoteExperience && <div className="error">{errors.hasRemoteExperience}</div>}
            </div>

            <div className="field">
              <label>What is your budget for the training phase?</label>
              <select name="budget" value={formData.budget} onChange={handleChange}>
                <option value="">Select your budget range</option>
                <option value="Below $100">Below $100</option>
                <option value="$100">$100</option>
                <option value="$150">$150</option>
                <option value="$200">$200</option>
                <option value="$250">$250</option>
              </select>
              <div className="hint">Successful candidates can expect a minimum of $400 monthly after training.</div>
              {errors.budget && <div className="error">{errors.budget}</div>}
            </div>

            <div className="field">
              <label>How much do you have readily available to start with?</label>
              <input type="number" name="availableFunds" value={formData.availableFunds} onChange={handleChange} min="0" placeholder="e.g. 150" />
              <div className="hint">Enter the amount in USD you can readily invest or have available to begin.</div>
              {errors.availableFunds && <div className="error">{errors.availableFunds}</div>}
            </div>
          </div>

          <div className="actions">
            {currentStep > 1 && (
              <button type="button" className="btn-secondary" onClick={prev}>Back</button>
            )}
            {currentStep < TOTAL_STEPS ? (
              <button type="button" className="btn-primary" onClick={next}>Continue</button>
            ) : (
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>

        {renderFooter()}
      </div>
    </div>
  );
}
