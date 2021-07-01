import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import './contactForm.css';

interface ContactForm {
  email: string;
  error: boolean;
  feedback: string;
  name: string;
};

const initialState: ContactForm = {
  email: '',
  error: false,
  feedback: '',
  name: '',
};

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [form, setForm] = useState<ContactForm>(initialState);

  const sendEmail = e => {
    emailjs.sendForm('gmail', 'template_odx9wac', e.target, 'your_user_id')
      .catch((err: any) => console.error(err));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {}
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {}

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    setForm({ ...form, error: false });

    if (!(form.email.includes('@'))) {
      return setForm({ ...form, error: true });
    }
  }

  return (
    <>
      {
        loading
          ? <>
            <span id="contact-form-loading">Sending feedback...</span>
          </>
          : formSent
            ? <>
              <span id="form-sent-text">Thank you! We greatly appreciate your feedback.</span>
            </>
            : <form onSubmit={handleSubmit}>
              <input
                className="contact-input"
                name="name"
                onChange={handleInputChange}
                placeholder="Full Name"
                type="text"
                value={form.name}
              />

              <input
                className="contact-input"
                name="email"
                onChange={handleInputChange}
                placeholder="Email"
                type="email"
                value={form.email}
              />

              {form.error && (
                <div id="contact-form-err">Please enter a valid email</div>
              )}

              <textarea
                onChange={handleTextAreaChange}
                value={form.feedback}
              />

              <button id="contact-form-btn">Send Feedback</button>
            </form>
      }
    </>
  )
}

export default ContactForm;
