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

  test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going?").fill("New York");
    await page.getByRole("button", { name: "Search" }).click();
  
    await expect(page.getByText("Hotels found in New York")).toBeVisible();
    await expect(page.getByText("New York City Hotel")).toBeVisible();
  });

  test("should show hotel detail", async ({ page }) => {
    await page.goto(UI_URL);
  
    await page.getByPlaceholder("Where are you going?").fill("New York");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByText("Hotels found in New York")).toBeVisible();
    await expect(page.getByText("New York City Hotel")).toBeVisible();

  
    await page.getByText("New York City Hotel").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
  });