// @ts-nocheck
import { test, expect } from '@playwright/test';
import { CheckboxDemoPage } from '../../pages/CheckboxDemoPage';

test('Single checkbox toggle', async ({ page }) => {
    const checkboxPage = new CheckboxDemoPage(page);
    await checkboxPage.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');

    expect(await checkboxPage.isChecked('single')).toBeFalsy();

    await checkboxPage.toggleSingle();
    expect(await checkboxPage.isChecked('single')).toBeTruthy(); // ✅ now works

    await checkboxPage.toggleSingle();
    expect(await checkboxPage.isChecked('single')).toBeFalsy();
});


test('Multiple checkbox selection', async ({ page }) => {
    const checkboxPage = new CheckboxDemoPage(page);
    await checkboxPage.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');

    await checkboxPage.clickMultiCheckbox('option1');
    await checkboxPage.clickMultiCheckbox('option3');

    //expect(await checkboxPage.verifyMultiCheckOption('option1')).toBeTruthy();
    expect(await checkboxPage.verifyMultiCheckOption('option2')).toBeFalsy();
    expect(await checkboxPage.verifyMultiCheckOption('option3')).toBeTruthy();

    // Set all to checked
    await checkboxPage.setAllMultiple(true);
    const allStates = await checkboxPage.isChecked('multiple');
    expect(allStates.every(s => s === true)).toBeTruthy();

    // Uncheck all
    await checkboxPage.uncheckAllMulti();
    const uncheckedStates = await checkboxPage.isChecked('multiple');
    expect(uncheckedStates.every(s => s === false)).toBeTruthy();
});
