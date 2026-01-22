//@ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");

/**
 * Resolve test files relative to this test file
 * CI-safe and cross-platform
 */
const fs = require("fs");
const testFilesDir = path.resolve(__dirname, "../../TestFiles");

const txtFile = path.join(testFilesDir, "testfile1.txt");
const jpgFile = path.join(testFilesDir, "testjpg.jpg");

// Guardrails: fail fast if files are missing (helps CI debugging)
if (!fs.existsSync(txtFile)) {
  throw new Error(`Missing test file: ${txtFile}`);
}
if (!fs.existsSync(jpgFile)) {
  throw new Error(`Missing test file: ${jpgFile}`);
}


test("Handling upload single file", async ({ page }) => {
  await page.goto("https://lambdatest.com/selenium-playground/upload-file-demo");

  // Invalid file type
  await page.setInputFiles("#file", txtFile);
  await expect(page.getByTestId("error"))
    .toContainText("File type should be pdf, png, jpeg or jpg");

  // Valid file type
  await page.setInputFiles("#file", jpgFile);
  await expect(page.getByTestId("error"))
    .toContainText("File Successfully Uploaded");
});

// ...existing code...

test("Handling upload multiple files", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator('input[type="file"]').click(),
  ]);

  await fileChooser.setFiles([txtFile, jpgFile]);

  const uploadedTxt = page.locator("tbody.files tr").filter({
    has: page.locator("p.name", { hasText: /testfile1\.txt/i }),
  });

  await expect(uploadedTxt.locator("strong"))
    .toContainText("File type not allowed");

  const uploadedJpg = page.locator("tbody.files tr").filter({
    has: page.locator("p.name", { hasText: /testjpg\.jpg/i }),
  });

  await expect(uploadedJpg.locator("strong"))
    .toBeEmpty();
});

// ...existing code...

test("Handling upload multiple files using filechooser method", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator('input[type="file"]').click(),
  ]);

  await fileChooser.setFiles([txtFile, jpgFile]);

  const uploadedTxt = page.locator("tbody.files tr").filter({
    has: page.locator("p.name", { hasText: /testfile1\.txt/i }),
  });

  await expect(uploadedTxt.locator("strong"))
    .toContainText("File type not allowed");

  const uploadedJpg = page.locator("tbody.files tr").filter({
    has: page.locator("p.name", { hasText: /testjpg\.jpg/i }),
  });

  await expect(uploadedJpg.locator("strong"))
    .toBeEmpty();
});

test("Handling upload dynamically generated file", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

  await page.locator('input[type="file"]').setInputFiles({
    name: "test.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Hello Playwright, this is a test file"),
  });

  const uploadedDynamicFile = page.locator("tbody.files tr").filter({
    has: page.locator("p.name", { hasText: /test\.txt/i }),
  });

  await expect(uploadedDynamicFile.locator("strong"))
    .toContainText("File type not allowed");
});
