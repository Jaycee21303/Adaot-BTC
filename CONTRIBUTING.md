# Contributing Guidelines

Thank you for your interest in improving Adapt-BTC. We welcome issues and pull requests that enhance the site while keeping security and transparency front and center.

## Getting Started
- Fork the repository and create feature branches from `main` (e.g., `feature/short-description`).
- Keep changes scoped and focused. If a change introduces dependencies or new tooling, document them in the pull request.

## Pull Request Requirements
- **2FA & signed commits:** Contributors with write access must enable GitHub 2FA and sign commits. Unsigned commits should be amended before review.
- **Branch protection:** All changes should land via pull requests with at least one approving review. Enable required status checks (CodeQL, dependency/security checks, and any tests) and disallow force pushes to protected branches.
- **Status checks:** Ensure GitHub Actions workflows are green before requesting review. Add or update tests and linters when adding functionality.
- **Reviews:** Address review feedback promptly. Summaries should explain risk areas, security considerations, and testing performed.

## Coding and Security Practices
- **Secrets:** Do not commit credentials, API tokens, or private keys. Use environment variables or GitHub Secrets. `.env` files are intentionally ignored.
- **Dependencies:** Prefer package-manager-managed dependencies. When adding third-party code or CDN assets, document the source and integrity metadata. Keep dependencies up to date; Dependabot will track GitHub Actions automatically.
- **Input handling:** Validate and sanitize inputs, encode outputs to avoid XSS, and avoid constructing URLs or queries from untrusted strings without escaping.
- **Error handling:** Fail safely and avoid leaking stack traces or sensitive information in user-visible output.

## Disclosure and Safety
- This project is educational and **not financial advice**. Do not position it as an investment recommendation.
- Security issues should be reported privately as described in [SECURITY.md](SECURITY.md); do not post exploit details in public issues.

## Community Expectations
- Be respectful and constructive in reviews and discussions.
- Document notable user-facing changes in commit messages and pull requests. Maintain changelog notes for releases when applicable.
