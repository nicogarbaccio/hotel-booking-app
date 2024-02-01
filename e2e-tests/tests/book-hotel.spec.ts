import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByRole("link", { name: "Sign In" }).click();
  
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");
  
    await page.getByRole("button", { name: "Log in" }).click();
  
    await expect(page.getByText("Sign in Successful!")).toBeVisible();
  });

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going?").fill("New York");
  
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);
    
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByText("Hotels found in New York")).toBeVisible();
    await expect(page.getByText("New York City Hotel")).toBeVisible();
    await page.getByText("New York City Hotel").click();
    
    let currentUrl = page.url();
    expect(currentUrl).toContain("/detail");

    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
    await page.getByRole("button", { name: "Book now" }).click();

    currentUrl = page.url();
    expect(currentUrl).toContain("/booking");
  
    await expect(page.getByText("Total Cost: $400.00")).toBeVisible();
  
    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame
      .locator('[placeholder="Card number"]')
      .fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");
  
    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("Booking Saved!")).toBeVisible();

    currentUrl = page.url();
    expect(currentUrl).toContain("/my-bookings");
    await expect(page.getByText("New York City Hotel")).toBeVisible();
  });