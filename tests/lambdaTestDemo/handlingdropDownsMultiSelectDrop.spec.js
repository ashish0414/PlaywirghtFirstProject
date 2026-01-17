import test, { expect } from "@playwright/test";

test('Handling single select dropdown', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');

  const dropdownSelection = page.getByTestId('select-demo');
  const selectedOption = page.locator('p.selected-value');

  // By value (direct string)
  await dropdownSelection.selectOption('Monday');
  await expect(selectedOption).toContainText('Monday');

  // By index
  await dropdownSelection.selectOption({ index: 4 }); // index starts at 0
  await expect(selectedOption).toContainText('Wednesday');

  // By value
  await dropdownSelection.selectOption({ value: 'Friday' });
  await expect(selectedOption).toContainText('Friday');

  // By label
  await dropdownSelection.selectOption({ label: 'Tuesday' });
  await expect(selectedOption).toContainText('Tuesday');

  // Another label example
  await dropdownSelection.selectOption({ label: 'Sunday' });
  await expect(selectedOption).toContainText('Sunday');
});
test('Print all options of select dropdown', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
  
    // Locate the dropdown
    const dropdown = page.locator('select#select-demo');
  
    // Get all option elements
    const options = await dropdown.locator('option').all();
  
    // Loop through options and print index, value, and text
    for (let i = 0; i < options.length; i++) {
      const value = await options[i].getAttribute('value');
      const text = await options[i].innerText();
      console.log(`Index: ${i}, Value: ${value}, Text: ${text}`);
    }
});

test('Handling multi select dropdown', async ({ page }) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
  
    const dropdownSelection = page.getByTestId('multi-select');
    const firstSelectedButton = page.getByRole('button', {name:"First Selected"})
    const firstSelectedValue = page.locator('p', {hasText : "First Selected option is"})

    const lastSeectedButton = page .getByRole('button', {name: "Get Last Selected"})
    const lastSelectedValue = page.locator('p', {hasText : "Last selected option is"})
  
    // By passing it in array
    await dropdownSelection.selectOption(["New Jersey", "Ohio", "Florida"]);
    await firstSelectedButton.hover()
    await firstSelectedButton.click()
    // await page.waitForSelector('p>span.groupradiobutton')
    // await expect(firstSelectedValue.locator('span.groupradiobutton')).toContainText('Florida')
  
   
  });