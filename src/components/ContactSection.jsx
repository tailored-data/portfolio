import { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';
import { LinkedInIcon, MailIcon, ArrowRightIcon, DownloadIcon } from './SiteIcons.jsx';
import { contactFormEndpoint } from '../data/portfolioData.js';

/**
 * Terminal section — the page's exit point, so every path forward is here.
 *
 * The form posts to Formspree, which accepts a plain fetch POST and emails
 * the result. That keeps the whole site a static bundle: no server, no
 * secrets in the client, nothing to run. If no endpoint is configured, the
 * form disables itself and the mailto: channel takes over — so the section
 * is never a dead end.
 */
export function ContactSection({ profile, index }) {
  const sectionRef = useRevealOnScroll();
  const [submissionState, setSubmissionState] = useState('idle'); // idle | sending | success | error

  const isFormEnabled = Boolean(contactFormEndpoint);

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    if (!isFormEnabled) return;

    setSubmissionState('sending');
    const formElement = submitEvent.target;

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        body: new FormData(formElement),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Form submission failed');

      formElement.reset();
      setSubmissionState('success');
    } catch (error) {
      setSubmissionState('error');
    }
  };

  const contactChannels = [
    { icon: <MailIcon />, label: profile.email, href: profile.mailToLink },
    { icon: <LinkedInIcon />, label: 'linkedin.com/in/taylor-burks', href: profile.linkedInUrl }
  ];

  return (
    <section className="pageSection" id="contact" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Get In Touch" />

        <div className="contactGrid">
          <div className="revealItem fromLeft">
            <p className="aboutLead">
              Open to roles in database engineering, data analytics, and .NET
              development — and always happy to talk shop.
            </p>
            <p className="aboutBody" style={{ marginTop: '0.75rem' }}>
              Send a message and my full résumé becomes available to download
              right here.
            </p>

            <div className="contactChannels">
              {contactChannels.map((channel) => (
                <a
                  className="contactChannel"
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                >
                  {channel.icon}
                  <span>{channel.label}</span>
                </a>
              ))}
            </div>
          </div>

          <form className="contactForm revealItem fromRight" onSubmit={handleSubmit}>
            <div className="formField">
              <label className="formLabel" htmlFor="contactName">
                Name
              </label>
              <input
                className="formInput"
                id="contactName"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </div>

            <div className="formField">
              <label className="formLabel" htmlFor="contactEmail">
                Email
              </label>
              <input
                className="formInput"
                id="contactEmail"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
              />
            </div>

            <div className="formField">
              <label className="formLabel" htmlFor="contactMessage">
                Message
              </label>
              <textarea
                className="formTextarea"
                id="contactMessage"
                name="message"
                required
                placeholder="What would you like to talk about?"
              />
            </div>

            {/* aria-live announces the result to screen readers without
                stealing focus from wherever the user currently is. */}
            <div aria-live="polite">
              {submissionState === 'success' && (
                <div className="resumeUnlock">
                  <p className="formStatus isSuccess">
                    Thanks — your message is on its way. I&apos;ll be in touch shortly.
                  </p>
                  <a
                    className="buttonPrimary"
                    href={profile.resumeUrl}
                    download
                    style={{ marginTop: '0.75rem' }}
                  >
                    <DownloadIcon />
                    Download my résumé
                  </a>
                </div>
              )}
              {submissionState === 'error' && (
                <p className="formStatus isError">
                  Something went wrong sending that. Email me directly at {profile.email}.
                </p>
              )}
            </div>

            <button
              className="buttonPrimary"
              type="submit"
              disabled={!isFormEnabled || submissionState === 'sending'}
              style={{ justifySelf: 'start' }}
            >
              {submissionState === 'sending' ? 'Sending…' : 'Send message'}
              <ArrowRightIcon />
            </button>

            {!isFormEnabled && (
              <p className="formHint">
                Form delivery isn&apos;t configured yet — add a Formspree endpoint in{' '}
                <code>src/data/portfolioData.js</code>. Until then, use the email link.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
