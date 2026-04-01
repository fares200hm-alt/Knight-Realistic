# Knight Realistic — Website

## 📁 Project Structure

```
knight-realistic/
├── index.html                  ← Main page
├── vercel.json                 ← Vercel deployment config
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── images/                 ← Put all skin + filter images here
│       ├── day-before.jpg
│       ├── day-after.jpg
│       ├── night-before.jpg
│       ├── night-after.jpg
│       ├── skins default_1.jpg ... skins default_6.jpg
│       ├── skins v1.2_1.jpg  ... skins v1.2_6.jpg
│       ├── skins v1.3_1.jpg  ... skins v1.3_6.jpg
│       └── skins v1.4_1.jpg  ... skins v1.4_6.jpg
├── sky/
│   ├── morning/
│   │   ├── sky112.jpg, sky112d.jpg
│   │   ├── sky212.jpg, sky212d.jpg
│   │   ├── sky312.jpg, sky312d.jpg
│   │   └── sky412.jpg, sky412d.jpg
│   ├── afternoon/
│   │   ├── sky116.jpg, sky116d.jpg
│   │   ├── sky216.jpg, sky216d.jpg
│   │   ├── sky316.jpg, sky316d.jpg
│   │   └── sky416.jpg, sky416d.jpg
│   └── night/
│       ├── sky121.jpg, sky121d.jpg
│       ├── sky221.jpg, sky221d.jpg
│       ├── sky321.jpg, sky321d.jpg
│       └── sky421.jpg, sky421d.jpg
└── videos/
    ├── video1.mp4              ← Featured video
    ├── video2.mp4              ← Skydoom video
    └── video3.mp4              ← SkinSRP video
```

## 🖥️ Running Locally

Just open `index.html` in a browser, or use a local server:
```bash
npx serve .
# or
python -m http.server 8080
```

## 🚀 Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. No build settings needed — it's a static site
4. Click Deploy

Or via CLI:
```bash
npm i -g vercel
vercel
```

## 🌐 Bilingual (EN / AR)

The language switcher is in the top navigation bar.
- Default: English (LTR)
- Arabic: RTL layout with full Arabic translations

## 📹 Videos

Place your `.mp4` files in the `videos/` folder:
- `video1.mp4` → Featured showcase
- `video2.mp4` → Skydoom video  
- `video3.mp4` → SkinSRP video

## 🖼️ Images

- Filter images: `assets/images/day-before.jpg`, `day-after.jpg`, `night-before.jpg`, `night-after.jpg`
- Skin images: `assets/images/skins v1.2_1.jpg` (note the space in filename)
- Sky images: `sky/morning/sky112.jpg` etc.

All images are optional — placeholders show if files are missing.
