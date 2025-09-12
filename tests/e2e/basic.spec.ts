import { test, expect } from '@playwright/test';

test.describe('SUKUNERGY Website', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /SUKUNERGY/i })).toBeVisible();
    
    // Check if the tagline is visible
    await expect(page.getByText(/Smart fuel for your day/i)).toBeVisible();
    
    // Check if WhatsApp CTA button is visible
    await expect(page.getByRole('button', { name: /Order via WhatsApp/i })).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to products page
    await page.getByRole('link', { name: /Produk/i }).click();
    await expect(page).toHaveURL('/products');
    await expect(page.getByRole('heading', { name: /Produk SUKUNERGY/i })).toBeVisible();
    
    // Test navigation to team page
    await page.goto('/');
    await page.getByRole('link', { name: /Tim/i }).click();
    await expect(page).toHaveURL('/team');
    await expect(page.getByRole('heading', { name: /Tim SUKUNERGY/i })).toBeVisible();
    
    // Test navigation to FAQ page
    await page.goto('/');
    await page.getByRole('link', { name: /FAQ/i }).click();
    await expect(page).toHaveURL('/faq');
    await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
  });

  test('WhatsApp order flow works', async ({ page, context }) => {
    await page.goto('/');
    
    // Listen for new page (WhatsApp will open in new tab)
    const pagePromise = context.waitForEvent('page');
    
    // Click the WhatsApp order button
    await page.getByRole('button', { name: /Order via WhatsApp/i }).click();
    
    // Wait for the new page and verify WhatsApp URL
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    const url = newPage.url();
    expect(url).toContain('wa.me');
    expect(url).toContain('SUKUNERGY');
    
    await newPage.close();
  });

  test('cart functionality works', async ({ page }) => {
    // Go to products page
    await page.goto('/products');
    
    // Click on first product to go to detail page
    await page.getByRole('link', { name: /Lihat Detail & Pesan/i }).first().click();
    
    // Should be on product detail page
    expect(page.url()).toContain('/products/');
    
    // Add to cart
    await page.getByRole('button', { name: /Tambah ke Keranjang/i }).click();
    
    // Check if success toast appears
    await expect(page.getByText(/ditambahkan ke keranjang/i)).toBeVisible();
    
    // Go to cart page
    await page.goto('/cart');
    
    // Verify cart has items
    await expect(page.getByText(/Item di Keranjang/i)).toBeVisible();
    
    // Test WhatsApp checkout
    const pagePromise = page.context().waitForEvent('page');
    await page.getByRole('button', { name: /Order via WhatsApp/i }).click();
    
    const whatsappPage = await pagePromise;
    expect(whatsappPage.url()).toContain('wa.me');
    await whatsappPage.close();
  });

  test('team Instagram links work', async ({ page, context }) => {
    await page.goto('/team');
    
    // Find Instagram follow buttons
    const followButtons = page.getByRole('link', { name: /Follow/i });
    const firstButton = followButtons.first();
    
    // Listen for new page
    const pagePromise = context.waitForEvent('page');
    
    // Click the first Instagram link
    await firstButton.click();
    
    // Verify Instagram URL opens
    const instagramPage = await pagePromise;
    await instagramPage.waitForLoadState();
    
    expect(instagramPage.url()).toContain('instagram.com');
    
    await instagramPage.close();
  });

  test('FAQ section is interactive', async ({ page }) => {
    await page.goto('/faq');
    
    // Find FAQ items
    const faqItems = page.locator('[data-testid="faq-item"]').first();
    
    if (await faqItems.count() > 0) {
      // Click to expand first FAQ
      await faqItems.click();
      
      // Check if answer becomes visible
      await expect(faqItems.locator('[data-testid="faq-answer"]')).toBeVisible();
    }
  });

  test('contact form works', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out contact form
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="message"]', 'This is a test message');
    
    // Submit form
    await page.getByRole('button', { name: /Kirim Pesan/i }).click();
    
    // Check for success message
    await expect(page.getByText(/berhasil dikirim/i)).toBeVisible();
  });

  test('mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Check if mobile menu opens
      await expect(page.getByRole('navigation')).toBeVisible();
    }
    
    // Check if content is still readable on mobile
    await expect(page.getByRole('heading', { name: /SUKUNERGY/i })).toBeVisible();
  });

  test('SEO meta tags are present', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    
    // Check title
    await expect(page).toHaveTitle(/SUKUNERGY/);
  });

  test('performance basics', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first few images are loaded
      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = images.nth(i);
        await expect(img).toHaveAttribute('src');
      }
    }
  });
});
