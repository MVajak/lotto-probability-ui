# Ad Integration Guide

This guide shows you how to display real ads in your Lotto Probability application.

## Current Setup

Your app is configured with **placeholder ads** for development. To show real ads, follow these steps:

---

## Google AdSense Integration

### Step 1: Sign up for Google AdSense
1. Go to https://www.google.com/adsense
2. Sign up with your Google account
3. Add your website URL and complete the application
4. Wait for approval (can take 1-3 days)

### Step 2: Get Your Publisher ID
Once approved:
1. Log in to your AdSense account
2. Go to **Account** → **Account Information**
3. Find your **Publisher ID** (format: `ca-pub-1234567890123456`)

### Step 3: Create Ad Units
1. In AdSense, go to **Ads** → **By ad unit**
2. Create 3 ad units:
   - **Mobile Banner**: 320x50 or Responsive
   - **In-Content**: 320x100 or Responsive (horizontal format)
   - **Sidebar**: 300x600 or Responsive
3. Copy the **Ad Slot ID** for each (format: `1234567890`)

### Step 4: Update Your Code

#### A. Update `public/index.html`
Replace `ca-pub-XXXXXXXXXXXXXXXX` on **line 33** with your actual Publisher ID.

Find this line:
```
src="...adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
```

Replace with:
```
src="...adsbygoogle.js?client=ca-pub-1234567890123456"
```

#### B. Update `.env.production`
Set the environment variable to show real ads instead of placeholders:
```bash
REACT_APP_SHOW_AD_PLACEHOLDERS=false
```

#### C. Update `src/shared/components/AdSpace/GoogleAd.tsx`
Replace the Publisher ID on **line 38** with your actual Publisher ID, or better yet, add it to your `.env.production`:

```bash
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
```

#### D. Update Ad Slot IDs
Add your ad slot IDs to `.env.production` (recommended):

```bash
REACT_APP_ADSENSE_MOBILE_SLOT=1234567890
REACT_APP_ADSENSE_INCONTENT_SLOT=0987654321
REACT_APP_ADSENSE_SIDEBAR_SLOT=1122334455
```

The code in `src/shared/components/AdSpace/index.tsx` (lines 135, 147, 157) will automatically use these environment variables.

### Step 5: Deploy and Verify
1. Build your app: `npm run build`
2. Deploy to your production domain
3. Wait 24-48 hours for ads to start showing (AdSense needs time to crawl your site)

---

## Ad Positions in Your App

Your app has 4 ad positions:

### 1. Top Mobile Banner (320x50)
- Shows on mobile/tablet devices only
- Appears at the top of every page
- **File:** `src/LottoPage/index.tsx` around line 21
- **Format:** Horizontal banner

### 2. In-Content Ad (320x100)
- Shows on mobile/tablet devices only
- Appears between Info and Search sections
- **Files:** All lotto card components (EuroJackpot, Viking, Bingo, Keno, Jokker)
- **Format:** Horizontal banner (compact)

### 3. Left Sidebar (300x600)
- Shows on desktop only (screens ≥1200px)
- Sticky positioning (follows scroll)
- **File:** `src/LottoPage/index.tsx` around line 39
- **Format:** Vertical skyscraper

### 4. Right Sidebar (300x600)
- Shows on desktop only (screens ≥1200px)
- Sticky positioning (follows scroll)
- **File:** `src/LottoPage/index.tsx` around line 58
- **Format:** Vertical skyscraper

---

## Environment Variables

### Development (`.env`)
```bash
# Show placeholders for layout testing
REACT_APP_SHOW_AD_PLACEHOLDERS=true

# These won't be used with placeholders enabled
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
REACT_APP_ADSENSE_MOBILE_SLOT=1234567890
REACT_APP_ADSENSE_INCONTENT_SLOT=0987654321
REACT_APP_ADSENSE_SIDEBAR_SLOT=1122334455
```

### Production (`.env.production`)
```bash
# Show real ads
REACT_APP_SHOW_AD_PLACEHOLDERS=false

# Your actual AdSense credentials
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
REACT_APP_ADSENSE_MOBILE_SLOT=1234567890
REACT_APP_ADSENSE_INCONTENT_SLOT=0987654321
REACT_APP_ADSENSE_SIDEBAR_SLOT=1122334455
```

---

## Testing

### Development Mode (Placeholders)
- `REACT_APP_SHOW_AD_PLACEHOLDERS=true` in `.env`
- Gray placeholder boxes show where ads will appear
- No real ad network calls are made
- Perfect for layout and design testing

### Production Mode (Real Ads)
- `REACT_APP_SHOW_AD_PLACEHOLDERS=false` in `.env.production`
- Real ads from Google AdSense will display
- Monitor AdSense dashboard for impressions and clicks

**Note:** Ads will NOT show on `localhost`. They need to be deployed to a real domain and approved by AdSense.

---

## Important Notes

### AdSense Policies
- ❌ Don't click your own ads (can get you banned)
- ❌ Don't ask users to click ads
- ✅ Ensure content complies with AdSense policies
- ⏰ Ads may not show immediately (needs approval + crawling time)

### Performance
- Ads are loaded asynchronously (won't block page load)
- Minimum heights prevent layout shift (good for Core Web Vitals)
- Monitor Core Web Vitals in Google Search Console

### Troubleshooting

**Ads not showing?**
- Check browser console (F12) for errors
- Verify Publisher ID and Slot IDs are correct
- Check AdSense account for policy violations or pending approvals
- Wait 24-48 hours after deployment
- Ensure site is publicly accessible (not localhost)
- Make sure `REACT_APP_SHOW_AD_PLACEHOLDERS=false` in production

**Blank ad spaces?**
- AdSense may not have ads to fill the space (low fill rate)
- Check if you're using an ad blocker
- Verify ad units are approved in AdSense dashboard
- Try different ad sizes (responsive units often work better)

**Still seeing placeholders in production?**
- Check that `.env.production` has `REACT_APP_SHOW_AD_PLACEHOLDERS=false`
- Rebuild your app: `npm run build`
- Clear browser cache and hard reload (Ctrl+Shift+R / Cmd+Shift+R)

---

## Revenue Optimization Tips

1. **Use responsive ad units** - Better fill rates across devices
2. **Monitor performance** - Check AdSense reports for which positions perform best
3. **Test ad placements** - Try different positions to maximize revenue
4. **Maintain quality content** - Better content = higher ad rates and traffic
5. **Traffic quality** - Focus on organic traffic from search engines
6. **Page speed** - Faster pages = better user experience = more ad views

---

## Alternative Ad Networks

If you want to use a different ad network instead of Google AdSense:

### Media.net
1. Sign up at https://www.media.net
2. Get your site ID and ad unit codes
3. Create a new component similar to `GoogleAd.tsx` for Media.net
4. Update `AdSpace/index.tsx` to use the new component

### PropellerAds
1. Sign up at https://propellerads.com
2. Create ad zones for each position
3. Integrate their provided code snippets

### Custom Implementation
To use a different ad network:
1. Create a new component in `src/shared/components/AdSpace/` (e.g., `MediaNetAd.tsx`)
2. Replace the `GoogleAd` import in `index.tsx`
3. Update the ad slot/zone IDs in environment variables

---

## Support & Resources

- **AdSense Help Center**: https://support.google.com/adsense
- **AdSense Policies**: https://support.google.com/adsense/answer/48182
- **Ad Sizes Guide**: https://support.google.com/adsense/answer/6002621
- **Code Location**: `src/shared/components/AdSpace/`

For technical issues with the integration, check the code comments in:
- `src/shared/components/AdSpace/index.tsx`
- `src/shared/components/AdSpace/GoogleAd.tsx`
