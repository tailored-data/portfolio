export function SiteFooter({ profile }) {
  return (
    <footer className="siteFooter">
      <div className="contentShell siteFooterInner">
        <span>
          © {new Date().getFullYear()} {profile.fullName} · Built with React &amp; Vite
        </span>

        <nav className="footerLinks" aria-label="Footer links">
          <a href={profile.linkedInUrl} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={profile.gitHubUrl} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={profile.mailToLink}>Email</a>
          <a href="#top">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
