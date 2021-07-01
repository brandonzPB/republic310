import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './contactForm.css';

interface ContactForm {
  email: string;
  feedback: string;
  name: string;
};

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm<ContactForm>();

  const onSubmit = (data: any): void => {}

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
            : <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="contact-input"
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                type="text"
                value={form.name}
              />
              <input
                className="contact-input"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                type="email"
                value={form.email}
              />
              <button>Send Feedback</button>
            </form>
      }
    </>
  )
}

export default ContactForm;
