import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async({ page }) => {
    // Log in 
    await page.goto(UI_URL);
    await page.getByRole('link', { name: "Sign In" }).click();
    let url = page.url();
    expect(url).toContain('/sign-in'); 
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.getByText("Sign in Successful!")).toBeVisible();
    await page.getByRole("link", { name: "My Hotels" }).click();
})

test("should allow the user to add a hotel", async({ page }) => {
    let currentUrl = page.url();
    expect(currentUrl).toContain('/my-hotels');
    await page.getByRole("link", { name: "Add Hotel" }).click();
    currentUrl = page.url();
    expect(currentUrl).toContain('/add-hotel');
    
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', '5');

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("2");

    // upload image files
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ]);

    await page.getByRole('button', { name: "Save" }).click();
    await expect (page.getByText("Hotel saved!")).toBeVisible();
})

test("should display a user's hotels", async ({ page }) => {
    let currentUrl = page.url();
    expect(currentUrl).toContain('/my-hotels');
    await expect(page.getByText("New York City Hotel")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText("New York, United States")).toBeVisible();
    await expect(page.getByText("Boutique")).toBeVisible();
    await expect(page.getByText("$200 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 1 children")).toBeVisible();
    await expect(page.getByText("4 Star Rating")).toBeVisible();

    await expect(page.getByRole("link", { name: "View Details" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
    let currentUrl = page.url();
    expect(currentUrl).toContain('/my-hotels');

    await page.getByRole("link", { name: "View Details" }).first().click();
    currentUrl = page.url();
    expect(currentUrl).toContain('/edit-hotel');
  
    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue("New York City Hotel");
    await page.locator('[name="name"]').fill("New York City Hotel UPDATED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
  
    currentUrl = page.url();
    expect(currentUrl).toContain('/my-hotels');

    await expect(page.getByText("New York City Hotel UPDATED")).toBeVisible();
    await page.getByRole("link", { name: "View Details" }).first().click();
    currentUrl = page.url();
    expect(currentUrl).toContain('/edit-hotel');
  
    await expect(page.locator('[name="name"]')).toHaveValue(
      "New York City Hotel UPDATED"
    );

    await page.locator('[name="name"]').fill("New York City Hotel");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
    await page.waitForTimeout(1000);
    currentUrl = page.url();
    expect(currentUrl).toContain('/my-hotels');
});