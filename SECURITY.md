# Security Policy

## Reporting a Vulnerability
If you discover a potential security issue, please email security@adaptbtc.org with a clear description, steps to reproduce, and any relevant logs or proof-of-concept details. Avoid filing public issues for sensitive reports so we can triage privately. We acknowledge receipt within 2 business days and aim to provide a triage decision within 7 days. Coordinated disclosure is appreciated; we will work with reporters on timelines before any public communication.

## Supported Versions
This project is under active development. Security fixes will be applied to the `main` branch and the latest published release (if releases exist). Older branches may not receive backports.

## Secure Development Requirements
- **2FA and signed commits:** All maintainers and contributors with write access must use GitHub 2FA and sign commits to reduce account-takeover and tampering risk. Enable branch protection to enforce signed commits, required reviews, and passing status checks before merges.
- **Secrets handling:** Never commit secrets. Use environment variables or GitHub Secrets for API keys and credentials, and ensure `.env*` files remain untracked.
- **Dependency hygiene:** External libraries should be added via tracked package managers. Dependabot is enabled to watch GitHub Actions. If npm or other package manifests are introduced, add corresponding Dependabot ecosystems and keep dependencies patched promptly.
- **SBOM and third-party code:** Maintain a Software Bill of Materials (SBOM) when adding third-party packages or vendored assets. Prefer well-maintained libraries with clear licenses, and document their provenance.
- **Input and output safety:** Validate and sanitize any user-supplied data, encode output to mitigate XSS, and avoid insecure string interpolation with untrusted values. Handle errors without leaking sensitive details.

## Security Testing
- **Code scanning:** Automated CodeQL analysis runs on pushes and pull requests to detect common vulnerabilities in JavaScript and related assets.
- **Continuous checks:** Required status checks should include security scanners and any linting or tests covering new functionality. Contributors should run relevant checks locally before opening a pull request.

We welcome additional security improvements and feedback to keep the project trustworthy.
