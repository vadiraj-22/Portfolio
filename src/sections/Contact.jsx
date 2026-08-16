import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init('oB1t1Cdl53tkkIyqn');
  }, []);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  //service_n25dt9o
  //template_lfg3c09
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_n25dt9o',
        'template_utt0vni',
        {
          from_name: form.name,
          to_name: 'Vadiraj Joshi',
          from_email: form.email,
          to_email: 'vadirajjoshi22504@gmail.com',
          message: form.message,
        }
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container pt-6 pb-12 sm:pb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray_gradient mt-4 sm:mt-6">Let's Talk — Contact Vadiraj Joshi</h2>
          <p className="text-base sm:text-lg text-white-600 mt-2">
            Looking for a full-stack developer, have a project idea, or want to discuss a collaboration? Drop me a message and I’ll get back to you promptly.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 sm:mt-8 flex flex-col space-y-5 pb-6 sm:pb-10">
            <label className="space-y-2">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., Rahul Sharma"
              />
            </label>

            <label className="space-y-2">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., rahul.sharma@gmail.com"
              />
            </label>

            <label className="space-y-2">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn mb-4 sm:mb-8" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;