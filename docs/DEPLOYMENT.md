# Caramel Fashion Showroom — Vercel Static Deployment Guide

This guide provides step-by-step instructions for deploying the Caramel luxury fashion showroom website to **Vercel** (Hobby or Pro tier) as a 100% static single-page application.

---

## 1. Architectural Model & Static Hosting Overview

Caramel is built using **React 19**, **TypeScript 5.7**, and **Vite 6.1**.

- **Pure Static Export**: When compiled via `npm run build`, Vite produces a completely static directory of HTML, CSS, JavaScript, and image assets in the `dist/` directory.
- **Zero Server Overhead**: The website does not require a Node.js runtime server, Docker container, Serverless Functions, or backend database.
- **Vercel Hobby Tier Compatibility**: Because there are no backend processes, SSR overhead, or database connections, the website runs at zero cost on Vercel's standard Hobby plan with global CDN caching.

> [!IMPORTANT]
> **Static Immutability Notice**:
> The Caramel showroom is a compiled static web application. Ordinary browser-based file uploads do not and cannot permanently modify the files deployed on Vercel. Adding new merchandise, updating prices, or adding review screenshots requires editing the local repository records and pushing an update to trigger a new Vercel deployment.

---

## 2. Recommended Deployment Method: Vercel Git Integration

The simplest and most resilient way to deploy and maintain Caramel is by connecting your GitHub or GitLab repository to Vercel.

### Step 1: Push Repository to GitHub
If you have not already initialized a Git repository, initialize it and push to your private or public GitHub account:

```bash
git init
git add .
git commit -m "feat: complete Caramel luxury showroom build"
git branch -M main
git remote add origin https://github.com/<your-username>/caramel-fashion-website.git
git push -u origin main
```

### Step 2: Import into Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Select your repository (`caramel-fashion-website`) and click **Import**.

### Step 3: Configure Project Settings
Vercel automatically detects Vite. Confirm that the configuration matches the exact project settings:

| Setting | Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` (leave default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | `20.x` or `22.x` |

### Step 4: Environment Variables
- **None required**. The website operates entirely with centralized in-source configurations (`src/config/brand.ts` and `src/config/contact.ts`). Leave the Environment Variables section blank.

### Step 5: Deploy
Click **Deploy**. Vercel will clone the repository, execute `npm run build`, and deploy the resulting `dist/` assets to a global edge network in approximately 30–60 seconds.

---

## 3. Alternative Deployment Method: Vercel CLI

If you prefer to deploy directly from your local terminal without connecting GitHub:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```
*(Or use `npx vercel` without global installation).*

### Step 2: Log in to Vercel
```bash
npx vercel login
```

### Step 3: Deploy Preview Build
From the project root directory, run:
```bash
npx vercel
```
Answer the interactive setup prompts:
- **Set up and deploy?**: `yes`
- **Which scope?**: Select your personal Vercel team/account.
- **Link to existing project?**: `no`
- **What's your project's name?**: `caramel-fashion-showroom`
- **In which directory is your code located?**: `./`
- **Want to modify build settings?**: `no` (Vite defaults `dist` automatically)

### Step 4: Deploy to Production
Once you verify the preview URL, run:
```bash
npx vercel --prod
```

---

## 4. Custom Domain Setup

To link a custom branded domain (e.g. `caramel-fashion.com` or `caramel-luxury.eg`):

1. Go to your Vercel Project Dashboard.
2. Navigate to **Settings** > **Domains**.
3. Enter your custom domain name and click **Add**.
4. Configure your domain's DNS records at your registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **For Apex Domain (`caramel-fashion.com`)**: Add an `A` record pointing to `76.76.21.21`.
   - **For Subdomain (`www.caramel-fashion.com`)**: Add a `CNAME` record pointing to `cname.vercel-dns.com`.
5. Vercel will automatically provision a free SSL/TLS certificate within a few minutes.

---

## 5. Image Size, Bandwidth & CDN Considerations

Because Caramel is an art-directed fashion showroom with high-resolution photography, follow these best practices to maintain optimal page speeds:

1. **Asset File Size Target**:
   - Keep individual product photographs between **150 KB and 350 KB**.
   - Avoid uploading uncompressed camera master files (5 MB – 20 MB).
   - Use the **WebP** image format whenever possible for high quality at lower file sizes.
2. **Standard Dimensions**:
   - Fashion Portrait (`--aspect-product`): **1200 × 1500 px** (4:5 ratio).
   - Hero Campaign Banner (`--aspect-hero`): **1920 × 1080 px** (16:9 ratio).
   - Editorial Spotlight (`--aspect-portrait`): **1200 × 1600 px** (3:4 ratio).
3. **Static Caching**:
   - All files under `dist/assets/` contain content hashes and are cached with immutable headers (`Cache-Control: max-age=31536000, immutable`).
   - Images in `public/images/` are cached aggressively on Vercel's global CDN.

---

## 6. Ongoing Maintenance Workflow

When you are ready to update the website:

1. **Add new photographs** to `public/images/products/<product-slug>/`.
2. **Add product records** to `src/data/products.ts` following [`docs/ADDING_PRODUCTS.md`](file:///docs/ADDING_PRODUCTS.md).
3. **Test locally**:
   ```bash
   npm run type-check
   node scratch/test-catalog-validation.mjs
   npm run build
   ```
4. **Deploy**:
   - If using Git: `git commit -am "chore: add new season products" && git push`
   - If using CLI: `npx vercel --prod`
5. Vercel will automatically build and publish the updated showroom.

---

## 7. Verification & Limitations Disclaimer

> [!NOTE]
> **Environment Limitation Note**:
> This development environment does not possess direct Vercel API tokens or an authenticated deployment session. Consequently, the actual live deployment steps have been compiled based on the verified static `dist/` build output and standard Vite deployment protocols. A deployment is only considered "live" once the brand owner executes the steps above on their own Vercel account.
