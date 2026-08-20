
# Resume and Portfolio

This repository contains my LaTeX resume and personal portfolio website.

The portfolio is live at [www.rifat.app](https://www.rifat.app).

## Files
- `Mohammad_Lutfar_Rahman_Rifat.tex` - LaTeX resume source
- `portfolio/` - Next.js portfolio source

- [Preview PDF](./Mohammad_Lutfar_Rahman_Rifat.pdf)

## Build the Resume
To generate the PDF:

```bash
pdflatex Mohammad_Lutfar_Rahman_Rifat.tex
```

Run twice for references. Open the PDF with:

```bash
open Mohammad_Lutfar_Rahman_Rifat.pdf
```

## Run the Portfolio

```bash
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.
