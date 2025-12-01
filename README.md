
# Mohammad Lutfar Rahman Rifat — Resume

**About:** A LaTeX resume for Mohammad Lutfar Rahman Rifat (software engineer). The source file is `Mohammad_Lutfar_Rahman_Rifat.tex` in this repository.

**Contents:**
- `Mohammad_Lutfar_Rahman_Rifat.tex` : LaTeX source for the resume
- `Mohammad_Lutfar_Rahman_Rifat.aux` : auxiliary file produced by LaTeX

**Quick Preview**
Below is a short plaintext extract of the resume header and key sections to make it easy to skim without compiling:

```
MOHAMMAD LUTFAR RAHMAN RIFAT
Software Engineer
Phone: +8801728776775 | Email: mlrifat370@gmail.com
LinkedIn: https://linkedin.com/in/mlr-rifat/ | GitHub: https://github.com/rifatr

EDUCATION
 - Rajshahi University of Engineering and Technology — B.Sc. in ECE (Dec 2024)

EXPERIENCE
 - Chaldal Engineering (June 2024 -- Present) — Software Engineer
	 * Developed ChaldalPay core services: QR payments, e-KYC, dispute flows, identity verification.
	 * Implemented facial verification (Amazon Rekognition, DeepFace) and NID API integration.
	 * Built multi-account bKash wallet binding logic; contributing to Payment Gateway with gRPC.

PROJECTS
 - RiShop — Full-stack e-commerce (Angular + ASP.NET Core)
 - Tree Explorer — React + TypeScript app to visualize nested JSON

TECH SKILLS
 - Languages: F#, C#, TypeScript, JavaScript, Python, C++
 - Tools / Frameworks: ASP.NET Core, React, Angular, Docker, Azure DevOps, gRPC
```

**Build / Preview (macOS, zsh)**

1. Install a TeX distribution (if not already installed). Recommended MacTeX:

```bash
brew install --cask mactex        # installs MacTeX (may be large)
```

2. Compile the PDF from the `.tex` source (run twice for proper references):

```bash
cd /Users/rifat/Code/Projects/Resume
pdflatex Mohammad_Lutfar_Rahman_Rifat.tex
pdflatex Mohammad_Lutfar_Rahman_Rifat.tex
```

3. Open the generated PDF on macOS:

```bash
open Mohammad_Lutfar_Rahman_Rifat.pdf
```

Notes:
- If you prefer `xelatex` or `lualatex` (for different font handling), replace `pdflatex` with your preferred engine.
- If you want to produce the PDF in a clean build directory, consider running LaTeX inside a temporary folder or cleaning the auxiliary files afterwards.

**Contributing / Edits**
- Edit `Mohammad_Lutfar_Rahman_Rifat.tex` and re-run the compile commands above.

**License**
- This repository currently has no license file. If you want a license, add a `LICENSE` file (e.g., MIT) and mention it here.

