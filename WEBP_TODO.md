# WebP Implementation Checklist

**Estimated Time:** 30 minutes
**Estimated Savings:** 1.7MB (64% reduction in image payload)

## Step 1: Install Conversion Tool (2 minutes)

```bash
# Windows
choco install webp

# macOS
brew install webp

# Linux
sudo apt-get install webp
```

## Step 2: Convert Images (5 minutes)

```bash
cd src/components/images

# Convert the two largest images
cwebp -q 80 beachroad.jpg -o beachroad.webp
cwebp -q 80 elvis.jpg -o elvis.webp

# Verify file sizes
ls -lh beachroad.*
ls -lh elvis.*
```

**Expected Results:**
- `beachroad.webp`: ~600-800 KB (vs 2,292 KB JPG = 65% savings)
- `elvis.webp`: ~100-150 KB (vs 362 KB JPG = 60% savings)

## Step 3: Update About.tsx Imports (10 minutes)

**File:** `src/components/sections/About.tsx`

**Add new imports at top:**
```tsx
import BeachRoadWebP from "@/components/images/beachroad.webp";
import ElvisWebP from "@/components/images/elvis.webp";
```

**Replace line 177-186 (BeachRoad image):**
```tsx
<picture>
  <source srcSet={BeachRoadWebP} type="image/webp" />
  <source srcSet={BeachRoad} type="image/jpeg" />
  <img
    src={BeachRoad}
    alt="San Pedro Beach Road showing iconic waterfront street with golf carts and tropical scenery"
    className="w-full object-cover retro-image transition-transform duration-300 hover:scale-105"
    style={{ height: "clamp(300px, 40vw, 500px)" }}
    width={1200}
    height={500}
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Replace line 195-207 (Elvis image):**
```tsx
<picture>
  <source srcSet={ElvisWebP} type="image/webp" />
  <source srcSet={Elvis} type="image/jpeg" />
  <img
    src={Elvis}
    alt="Friendly local Caye Cruiser driver ready to show you around San Pedro"
    className="w-full h-full object-cover retro-image transition-transform duration-300 hover:scale-105"
    width={400}
    height={400}
    loading="lazy"
    decoding="async"
  />
</picture>
```

## Step 4: Test Build (3 minutes)

```bash
npm run build
```

**Verify in `dist/` folder:**
- Both `.webp` and `.jpg` files are bundled
- Bundle includes both formats for fallback support

## Step 5: Test in Browser (5 minutes)

```bash
npm run preview
```

**Check:**
1. Open browser DevTools → Network tab
2. Filter by "Img"
3. Verify browsers that support WebP load `.webp` files
4. Check file sizes are ~60-65% smaller

## Step 6: Optional - Add More Images (10 minutes)

If you want to convert other images later:

```bash
# Batch convert all JPGs in a directory
cd src/components/images
for file in *.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

Then update imports in relevant components.

---

## Troubleshooting

**Issue:** Build fails with "Cannot find module .webp"
**Solution:** Make sure TypeScript recognizes WebP files. Add to `vite-env.d.ts`:
```typescript
declare module '*.webp' {
  const src: string;
  export default src;
}
```

**Issue:** Images not showing
**Solution:** Check file paths are correct and files exist in dist/ after build

**Issue:** WebP files too large
**Solution:** Try lower quality: `cwebp -q 75` or `cwebp -q 70`

---

## Browser Support Note

- ✅ **97%+ browsers support WebP** (Chrome, Firefox, Safari 14+, Edge)
- ⚠️ **Older browsers** automatically fall back to JPG (that's why we use `<picture>`)
- No user sees broken images - it degrades gracefully

---

**Priority:** HIGH
**When to do:** After completing other quick wins (#4, #5, #6)
**Full guide:** See `IMAGE_OPTIMIZATION_GUIDE.md` for advanced options
