# 🛠️ GitHub Pages Deployment Guide (Master Edition)

To ensure the "Master Edition" of your Psyche Map loads correctly with all its high-fidelity content, follow these exact steps.

## 📁 Critical Step: The Folder Structure
GitHub's web interface (the "Upload files" button) can be tricky. If you don't maintain the exact folder structure, the app will fail to load the styles or data.

**DO NOT** upload individual files one by one.

### 📥 The Correct Way (Drag and Drop):
1. Open your repository on GitHub in your browser.
2. Open the `psyche` folder on your computer.
3. Select everything inside the `psyche` folder (`index.html`, and the folders `css/`, `js/`, `data/`).
4. **Drag and drop the entire selection** into the GitHub repository window.
5. GitHub will show that it is uploading files *inside* those folders (e.g., `js/app.js`).

---

## ⚙️ Repository Settings
1. Go to your repository **Settings** tab.
2. Click **Pages** on the left menu.
3. Under **Branch**, select `main` (or `master`) and Click **Save**.
4. **WAIT 2-3 MINUTES**. GitHub takes a moment to process the 3D assets and large data files.

---

## 🔍 Troubleshooting the "Blank Map"
If the map is still missing, check these three things:
1. **Case Sensitivity**: Ensure all filenames are lowercase. I have already synchronized this for you in the latest "Hardened" version.
2. **Subfolder URL**: If your repo is named `psyche`, the URL MUST be: `https://yourname.github.io/psyche/` (Note the trailing slash `/`).
3. **Loading Screen**: If you see a **Red Error Message**, it means the `data/` folder is missing or incorrectly placed.

---

## 🚀 Pro Tip: PWA Support
Once your site is live, open it on your iPhone in Safari and tap **"Add to Home Screen"**. The app will now have its own golden icon and run in a premium full-screen immersive mode.

---
*Follow this guide exactly for a "GitHub-Proof" experience.*
