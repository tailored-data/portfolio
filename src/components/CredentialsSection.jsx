import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js';
import { SectionHeading } from './SectionHeading.jsx';

/**
 * Education and certifications.
 *
 * Both render through the same Credential model, so adding a new cert is a
 * one-line change in portfolioData.js — the badge, layout, and status
 * label all derive from the model itself. Education uses a Degree badge
 * instead of Certified, which is reserved for actual certifications.
 */
export function CredentialsSection({ profile, index }) {
  const sectionRef = useRevealOnScroll({ staggerMs: 70 });

  const renderCredentialCard = (credential, kind) => (
    <article className="card revealItem" key={credential.slug}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem'
        }}
      >
        <h3 className="cardTitle">{credential.title}</h3>
        <span className="credentialBadge">
          {kind === 'degree' ? 'Degree' : credential.statusLabel}
        </span>
      </div>

      <p className="cardSubtitle">{credential.issuer}</p>
      {credential.detail && <p className="cardBody">{credential.detail}</p>}
      <p className="cardMeta" style={{ marginTop: '1rem' }}>
        {credential.year}
      </p>
    </article>
  );

  return (
    <section className="pageSection" id="credentials" ref={sectionRef}>
      <div className="contentShell">
        <SectionHeading index={index} title="Education & Certifications" />

        <div className="credentialGrid">
          {profile.education.map((credential) =>
            renderCredentialCard(credential, 'degree')
          )}
          {profile.certifications.map((credential) =>
            renderCredentialCard(credential, 'certification')
          )}
        </div>
      </div>
    </section>
  );
}
