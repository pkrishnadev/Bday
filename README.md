# 🌹 Birthday Website — Setup Guide

A cinematic, romantic birthday website built with HTML, CSS & JavaScript.  
Designed for GitHub Pages hosting. No backend required.

---

## 📁 Folder Structure

```
Bday/
├── index.html              ← Main page
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All interactions & animations
├── assets/
│   ├── images/             ← Add your photos here
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   └── photo4.jpg
│   └── music/
│       └── bg.mp3          ← Add your background music here
└── README.md
```

---

## 🔧 Personalisation Checklist

### 1. Change the Password
In `js/main.js`, line 5:
```js
const PASSWORD = "0214"; // ← change to your 4-digit password
```

### 2. Add Your Name
In `index.html`, find:
```html
<p class="bday-name">Diana ✨</p>
```
Replace `Diana` with the recipient's name.

### 3. Add Photos
- Place 4 photos named `photo1.jpg` – `photo4.jpg` in `assets/images/`
- In `index.html`, find the polaroid sections and uncomment the `<img>` tags, e.g.:
```html
<!-- <img src="assets/images/photo1.jpg" alt="Us" class="polaroid-img" /> -->
```
Remove the `<!-- -->` comments to enable them.

### 4. Add Background Music
- Place an `.mp3` file named `bg.mp3` in `assets/music/`
- Suggested: a soft romantic instrumental (piano, strings)
- Free music: https://pixabay.com/music/ (search "romantic piano")

### 5. Customise the Messages
Edit the text in `index.html` in sections:
- `#birthday-section` — birthday heading
- `#message-section` — heartfelt paragraph
- `.frame-quote` — captions beside each photo
- `#final-section` — closing message

### 6. Change Polaroid Captions
Find `.polaroid-caption` spans in each photo frame and update the text.

---

## 🚀 Deploy to GitHub Pages

```bash
# 1. Create a new GitHub repository named "Bday"
#    (go to github.com → New Repository → name: Bday → Public → Create)

# 2. From inside this folder:
git init
git add .
git commit -m "birthday website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Bday.git
git push -u origin main

# 3. Enable GitHub Pages:
#    GitHub repo → Settings → Pages → Source: main branch → / (root) → Save

# 4. Your site will be live at:
#    https://YOUR_USERNAME.github.io/Bday/
```

---

## 🎨 Colour Palette

| Name       | Hex       | Use                    |
|------------|-----------|------------------------|
| Crimson    | `#8B1A1A` | Accents, deep bg       |
| Deep Red   | `#5C0A0A` | Dark backgrounds       |
| Rose       | `#C4536A` | Buttons, highlights    |
| Blush      | `#F2AABA` | Text accents           |
| Soft Pink  | `#F9D5DC` | Light elements         |
| Cream      | `#FAF0E6` | Main text              |

---

## 🔑 Default Password

`0214` (Valentine's Day — Feb 14th)

Change this in `js/main.js` to your special date or code.

---

Made with 🌹 and lots of love.
