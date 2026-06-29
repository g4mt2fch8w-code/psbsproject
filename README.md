# 🌳 PSBS Website Editor's Guide (Easy & Non-Technical)

Welcome to your website code! This guide is written for you if you have **zero coding knowledge**. It will show you exactly which files to open and what text to change when you want to update names, partner logos, species counts, testimonials, or turn off special visual effects.

---

## 📁 How to Open and Edit Files

All the files are plain text documents. You can open them in any code editor (like **VS Code** or **Cursor**) or even basic text editors.

- Whenever you make a change, **save the file** (Ctrl + S or Cmd + S).
- If your development server is running (`bun dev`), the website will **automatically refresh** with your changes!

---

## 🎨 1. How to Edit the Logo and Site Title

### To change the "PSBS" brand text:

1. Open the file: `src/components/site/Nav.tsx`
2. Search for the words: `PSBS` (around line 65)
3. Change it to whatever you like.
4. If you also want to change the subtext `"Bhandara · India"`, it is right below it on line 68. Change that text too!
5. _Note: Remember to also change it in the footer by opening `src/components/site/Footer.tsx` and looking for `PSBS` (around line 10)._

---

## 🤝 2. How to Edit Partner & Supporter Names (Tata Trusts, WWF, etc.)

These are the scrolling pill-badges at the bottom of the home page.

1. Open the file: `src/components/site/Partners.tsx`
2. Look at the top of the file (lines 6 to 15). You will see a list that looks like this:
   ```javascript
   const partners = [
     "Maharashtra Forest Department",
     "Wildlife Institute of India",
     "Bombay Natural History Society",
     "WWF India",
     ...
   ];
   ```
3. **To edit a name**: Just change the text inside the quotation marks (e.g., change `"Tata Trusts"` to `"Your New Partner"`).
4. **To add a partner**: Add a new line with quotation marks and a comma at the end, like:
   `"New Partner Organization",`
5. **To remove a partner**: Delete the entire line.

---

## 💬 3. How to Edit Testimonials (Quotes & Names)

These are the quote cards on the home page.

1. Open the file: `src/components/site/Testimonials.tsx`
2. Look at the top of the file (lines 5 to 26). You will see a list of testimonials like this:
   ```javascript
   const testimonials = [
     {
       quote: "Walking with PSBS in the pre-dawn forest near Nagzira changed me...",
       name: "Priya Deshpande",
       role: "Field Volunteer, Nagpur",
     },
     ...
   ]
   ```
3. To edit any quote, name, or role, simply change the text inside the quotation marks. Make sure to keep the double quotes `" "` and commas intact.

---

## 🐅 4. How to Update Wildlife Species & Counts (e.g. Tiger count)

There are two places where wildlife data is shown: the **Home page** and the dedicated **Wildlife page**.

### To change counts shown on the Home page:

1. Open the file: `src/components/site/Wildlife.tsx`
2. Scroll to lines 8 to 13. You will see a list of species:
   ```javascript
   const species = [
     { img: tiger, status: "Endangered", count: "38", ... },
     { img: hornbill, status: "Vulnerable", count: "210+", ... },
     ...
   ]
   ```
3. Change the `"38"` or `"210+"` inside the `count` section to your new numbers. You can also change the description text (`body`) right there!

### To change counts shown on the dedicated Wildlife page:

1. Open the file: `src/routes/wildlife.tsx`
2. Find the list at the top (lines 13 to 48) and change the `count` and descriptions there as well.

---

## 🗺️ 5. How to Edit the Forests and Map Coordinates

### To change the reserves list or areas shown on the map:

1. Open the file: `src/components/site/Forests.tsx`
2. Search for `const reserves = [` near the top (line 4).
3. You will see:
   ```javascript
   const reserves = [
     { name: "Navegaon-Nagzira Tiger Reserve", area: "653.67 km²", x: 22, y: 38 },
     { name: "Koka WLS", area: "92.34 km²", x: 38, y: 28 },
     ...
   ]
   ```
4. Change the `name` or `area` text to update the list.
5. The `x` and `y` represent where the gold dot appears on the map (as a percentage from 0 to 100). Adjusting these will move the dots!

---

## ⚙️ 6. How to Turn Off / Toggle Special Visual Effects

If you want to simplify the page or disable some of the complex animations:

### To turn off the Gold Cursor Glow:

1. Open the file: `src/routes/index.tsx` (and any other route file like `about.tsx`)
2. Find the line: `<CursorGlow />`
3. Delete this line or comment it out by putting `{/*` and `*/}` around it, like:
   `{/* <CursorGlow /> */}`

### To turn off the Canvas Fireflies (drifting sparks):

1. Open the file: `src/components/site/Hero.tsx`
2. Find the line: `<Fireflies density={70} />` (around line 52)
3. Comment it out or delete it.

### To turn off the 3D Particle Field in the Hero background:

1. Open the file: `src/components/site/Hero.tsx`
2. Find the line: `<ForestScene />` (around line 48)
3. Comment it out or delete it.

### To turn off Smooth Scrolling (Lenis):

1. Open the file: `src/routes/index.tsx` (and other pages)
2. Find the line: `<SmoothScroll />`
3. Delete or comment it out: `{/* <SmoothScroll /> */}`

---

## 💳 7. How to Edit Donation Details & Mock Options

If your bank account details or donation tiers change:

1. Open the file: `src/routes/donate.tsx`
2. **For Tiers**: Scroll to the top `const tiers = [` (lines 50 to 54) to edit the levels (Seed, Sapling, Guardian).
3. **For Bank Details / Cheques**: Scroll to `const otherWays = [` (lines 56 to 87) to change the account numbers, IFSC codes, bank names, or mailing address.
