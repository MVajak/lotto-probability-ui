# Ad Testing Guide

This guide explains how to test Google AdSense ads locally and verify your integration.

## Testing Options

### Option 1: Placeholder Mode (Default - Easiest)

**Current setup** - Shows gray placeholder boxes where ads will appear.

```bash
# In your .env file
REACT_APP_SHOW_AD_PLACEHOLDERS=true
```

```bash
npm start
```

**What you'll see:**
- Gray boxes showing "Advertisement" with ad dimensions
- Perfect for layout testing and visual design
- No external dependencies

---

### Option 2: Google Test Ads (Recommended for Integration Testing)

Google provides **test ad units** that work on localhost for testing integration.

#### Step 1: Use Test Configuration

Create or copy `.env.test` with Google's test credentials:

```bash
cp .env.test .env.local
```

Or add these to your `.env.local`:

```env
REACT_APP_SHOW_AD_PLACEHOLDERS=false

# Google's official test ad credentials (safe to use on localhost)
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-3940256099942544
REACT_APP_ADSENSE_MOBILE_SLOT=1033173712
REACT_APP_ADSENSE_INCONTENT_SLOT=2562852117
REACT_APP_ADSENSE_SIDEBAR_SLOT=4105112575
```

#### Step 2: Restart Development Server

```bash
npm start
```

#### Step 3: What You'll See

- **Test ads will load** with "Test" watermark
- Ads will display properly (they're real AdSense test ads)
- **No revenue generated** (these are test units)
- Verifies your integration is working correctly

**Important:** These are Google's official test IDs. They're meant for testing and won't generate any revenue.

---

### Option 3: Using Localhost Tunneling (Advanced)

To test with your actual AdSense account on localhost, you need to expose your local server to the internet.

#### Using ngrok (Free):

1. **Install ngrok**
   ```bash
   npm install -g ngrok
   # or download from https://ngrok.com/download
   ```

2. **Start your app**
   ```bash
   npm start
   ```

3. **Create tunnel in another terminal**
   ```bash
   ngrok http 3001
   ```

4. **Use the ngrok URL**
   - ngrok will provide a public URL like: `https://abc123.ngrok.io`
   - Open this URL in your browser
   - Add this URL to your AdSense approved sites (if required)

**Limitations:**
- Free ngrok URLs change every time you restart
- AdSense may require site verification
- Real ads may not show without AdSense approval

---

### Option 4: Deploy to Staging Environment

The most reliable way to test real ads.

#### Using Vercel (Free):

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Add AdSense integration"
   git push
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `REACT_APP_SHOW_AD_PLACEHOLDERS=false`
     - `REACT_APP_ADSENSE_CLIENT_ID=your-real-id`
     - `REACT_APP_ADSENSE_MOBILE_SLOT=your-mobile-slot`
     - `REACT_APP_ADSENSE_INCONTENT_SLOT=your-incontent-slot`
     - `REACT_APP_ADSENSE_SIDEBAR_SLOT=your-sidebar-slot`

3. **Test on staging URL**
   - Vercel provides URL like: `https://your-app.vercel.app`
   - Add this to AdSense approved sites
   - Real ads should show after approval

#### Using Netlify (Free):

Similar process to Vercel:
- https://netlify.com
- Connect GitHub repo
- Add environment variables
- Deploy and test

---

## Troubleshooting

### Ads Not Showing?

**Check the browser console (F12 → Console tab):**

1. **"AdSense error: adsbygoogle is not defined"**
   - Script tag not loaded
   - Check network tab for blocked requests
   - Verify script URL in `public/index.html`

2. **Empty ad space but no errors**
   - Using placeholder mode - check `.env` file
   - AdSense may not have ads for your test domain
   - Check if ad blocker is enabled
   - Test ads need Google's test IDs

3. **"Client ID is invalid"**
   - Check `REACT_APP_ADSENSE_CLIENT_ID` in your `.env` file
   - Ensure it starts with `ca-pub-`
   - Verify it's set correctly in environment variables

### Verifying Integration

Open browser DevTools (F12) and check:

1. **Network Tab**
   - Look for request to `pagead2.googlesyndication.com`
   - Should return 200 status
   - If blocked, check ad blocker or network settings

2. **Console Tab**
   - Should see no errors related to AdSense
   - May see warnings (normal for test environment)

3. **Elements Tab**
   - Inspect ad container
   - Look for `<ins class="adsbygoogle">` element
   - Should have `data-ad-status` attribute when ad loads

---

## Testing Checklist

Before deploying to production:

- [ ] Test with placeholders (layout looks good)
- [ ] Test with Google test ads (integration works)
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [ ] Check Core Web Vitals (no layout shift)
- [ ] Test on staging environment with real ads
- [ ] Verify AdSense account is approved
- [ ] Add production domain to AdSense
- [ ] Check all ad positions show correctly
- [ ] Monitor AdSense dashboard for impressions

---

## Quick Reference

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_SHOW_AD_PLACEHOLDERS` | Show placeholders vs real ads | `true` or `false` |
| `REACT_APP_ADSENSE_CLIENT_ID` | Your AdSense publisher ID | `ca-pub-1234567890123456` |
| `REACT_APP_ADSENSE_MOBILE_SLOT` | Mobile banner ad slot | `1234567890` |
| `REACT_APP_ADSENSE_INCONTENT_SLOT` | In-content ad slot | `0987654321` |
| `REACT_APP_ADSENSE_SIDEBAR_SLOT` | Sidebar ad slot | `1122334455` |

### Commands

```bash
# Development with placeholders
npm start

# Test integration with Google test ads
# (set REACT_APP_SHOW_AD_PLACEHOLDERS=false in .env.local first)
npm start

# Production build
npm run build

# Preview production build locally
npx serve -s build
```

---

## Best Practices

1. **Always test with placeholders first** - Verify layout before testing real ads
2. **Use Google test IDs for integration testing** - Safe to use on localhost
3. **Test on staging environment** - Before deploying to production
4. **Monitor AdSense dashboard** - Check for policy violations or errors
5. **Keep test and production configs separate** - Use different `.env` files
6. **Don't click your own ads** - Can get your AdSense account banned

---

## Support

- **AdSense Help**: https://support.google.com/adsense
- **Test Ad Units**: https://developers.google.com/admob/android/test-ads
- **Integration Issues**: Check browser console for errors
