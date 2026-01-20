# Jamia Imamuddin Madrasa — Website Starter

This repository contains a small static website for Jamia Imamuddin Madrasa (Founder: Mufti Imamuddin Jamia — Est. 1993) located at Shivrampally Jagir, Hyderabad, Telangana.

Included files
- index.html — Home, About, Programs, Faculty, Admissions, Events, Gallery
- contact.html — Address, phone numbers, demo contact form
- dashboard.html — Client-side gallery admin (saves to browser localStorage)
- styles.css — Responsive styling
- script.js — Small helpers (year, mobile nav toggle, gallery + dashboard handlers)
- images/ — Place your images here (image1.jpg, image2.jpg, image3.jpg)

How to publish (quick guide)
1. Create a repository named `hammad.github.io` under your GitHub account (owner: hammad).
2. Add these files and create a folder "images" with the three image files:
   - images/image1.jpg
   - images/image2.jpg
   - images/image3.jpg
3. Push to the `main` branch and enable GitHub Pages (Settings → Pages → Branch: main / folder: / (root) → Save).
4. The site will be served at: https://hammad.github.io

If you prefer to deploy to Netlify or Vercel, simply connect the repo and follow their deploy guides.

Local commit & push commands
- Initialize and push to an existing repo (run from your project folder):

  git init
  git add .
  git commit -m "Add Jamia Imamuddin Madrasa site + images"
  git branch -M main
  git remote add origin https://github.com/hammad/hammad.github.io.git
  git push -u origin main

Notes
- The dashboard page saves uploaded images in the browser (localStorage). To make images visible to everyone, upload them to images/ and push them to the repo.
- If you want, I can also prepare a zip bundle you can download and extract locally. I can also add server-side upload support or make the repo commit for you if you grant push access.
