import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import './contactForm.css';

interface ContactForm {
  email: string;
  feedback: string;
  name: string;
};

const initialState: ContactForm = {
  email: '',
  feedback: '',
  name: '',
};

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [form, setForm] = useState<ContactForm>(initialState);

  const sendEmail = (e: any) => {
    // e: [name, email, feedback]
    emailjs.sendForm('service_t3n1a96', 'template_odx9wac', e.currentTarget, 'user_dgi0l1PJ4iuzlIsyG6DBd')
      .catch((err: any) => console.error(err));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setForm({
      ...form,
      feedback: e.currentTarget.value,
    })
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    setLoading(loading => !loading);

    sendEmail(e);

    setLoading(loading => !loading);
    setFormSent(sent => !sent);
  }

  return (
    <div id="contact-form__container">
      {
        loading
          ? <>
            <span id="contact-form-loading">Sending feedback...</span>
          </>
          : formSent
            ? <div id="form-sent-text__container">
              <span id="form-sent-text">Thank you! We greatly appreciate your feedback.</span>
            </div>
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

              <textarea
                id="contact-feedback-input"
                onChange={handleTextAreaChange}
                value={form.feedback}
              />

              <button id="contact-form-btn">Send Feedback</button>
            </form>
      }
    </div>
  )
}

export default ContactForm;
