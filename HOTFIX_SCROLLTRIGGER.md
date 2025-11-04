# Hotfix: ScrollTrigger Reference Error

**Issue:** ScrollTrigger is not defined error in ScrollingCruise.tsx
**Fixed:** 2025-10-23
**Duration:** 2 minutes

---

## Problem

After Phase 5 (animation fixes) and Phase 8 (code splitting), the application crashed on load with:

```
Uncaught ReferenceError: ScrollTrigger is not defined
    at ScrollingCruise.tsx:31:5
```

---

## Root Cause

During Phase 5, we consolidated GSAP plugin registrations by removing duplicate `gsap.registerPlugin(ScrollTrigger)` calls and the `ScrollTrigger` import from multiple files including `ScrollingCruise.tsx`.

However, line 31 of ScrollingCruise.tsx still had:
```typescript
ScrollTrigger.refresh();
```

This line referenced `ScrollTrigger` which was no longer imported, causing a reference error.

---

## Why This Happened

1. **Phase 5 Changes:**
   - Removed `import ScrollTrigger from "gsap/ScrollTrigger";` from ScrollingCruise.tsx
   - Removed `gsap.registerPlugin(ScrollTrigger);`
   - Left `ScrollTrigger.refresh()` call by mistake

2. **Not Caught During Build:**
   - TypeScript didn't catch this because ScrollTrigger is a global after registration
   - Build succeeded but runtime failed

---

## Solution

Removed the redundant `ScrollTrigger.refresh()` call from line 31.

**File:** `src/components/sections/ScrollingCruise.tsx`

**Before (lines 11-35):**
```typescript
const ctx = gsap.context(() => {
  gsap.to(textRef.current, {
    scaleY: 4,
    y: 0,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true, // ✅ Handles refresh automatically
    },
  });
});

ScrollTrigger.refresh(); // ❌ Redundant - removed

return () => {
  ctx.revert();
};
```

**After (lines 11-31):**
```typescript
const ctx = gsap.context(() => {
  gsap.to(textRef.current, {
    scaleY: 4,
    y: 0,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true, // ✅ Handles refresh automatically
    },
  });
});

return () => {
  ctx.revert();
};
```

---

## Why ScrollTrigger.refresh() Was Redundant

The `invalidateOnRefresh: true` option automatically handles ScrollTrigger recalculation on window resize. The manual `ScrollTrigger.refresh()` call was:

1. **Unnecessary** - `invalidateOnRefresh` handles it
2. **Redundant** - Called on every component mount
3. **Problematic** - Required importing ScrollTrigger (which we removed)

---

## Verification

### Build Status: ✅ SUCCESS
```
✓ 1767 modules transformed
✓ Built in 33.99s
✓ No errors
```

### Runtime Testing: ✅ PASS
- Homepage loads without errors
- ScrollingCruise animation works correctly
- No ScrollTrigger reference errors
- All animations smooth and responsive

---

## Files Modified

1. **src/components/sections/ScrollingCruise.tsx**
   - Removed `ScrollTrigger.refresh()` call (line 31)
   - Cleaned up extra blank lines

---

## Lessons Learned

### 1. Test Runtime After Major Refactors

**What Happened:**
- Phase 5 removed imports during consolidation
- Build succeeded but runtime failed
- Caught in development, not production (good!)

**Prevention:**
- Run `npm run dev` and test in browser after major refactors
- Don't just rely on `npm run build` success

### 2. Search for All References Before Removing Imports

**What Should Have Been Done:**
```bash
# Before removing ScrollTrigger import, search for all uses:
grep -r "ScrollTrigger\." src/
```

Would have caught: `ScrollTrigger.refresh()` usage

### 3. Automated Testing Would Help

**Future Improvement:**
- Add basic smoke tests that render components
- Would catch reference errors before manual testing

---

## Related Documentation

- **Phase 5:** PHASE_5_ANIMATION_FIXES.md (original consolidation)
- **Phase 8:** PHASE_8_CODE_SPLITTING.md (when error was discovered)

---

**Status: ✅ FIXED**

Application now loads and runs without errors. All animations working as expected.
