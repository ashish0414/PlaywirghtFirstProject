// @ts-check
import { CommonPage } from "./commonPage";

/** @typedef {'single' | 'disabled' | 'multiple'} CheckboxType */

/**
 * Page Object for Checkbox Demo
 */
export class CheckboxDemoPage extends CommonPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);

        // === Single Checkbox Section ===
        // In constructor:
        const singleSection = page.getByRole('heading', { name: 'Single Checkbox Demo' }).locator('..');

        this.singleCheckboxLabel = singleSection.locator('label'); // Click the label
        this.singleCheckbox = singleSection.locator('label > input[type="checkbox"]'); // For isChecked()
        this.singleCheckboxCheckedText = singleSection.locator('p', { hasText: 'Checked!' }); // optional visual check


        // === Disabled Checkbox Section ===
        const disabledSection = page.getByRole('heading', { name: 'Disabled Checkbox Demo' }).locator('..');
        this.disabledCheckbox = disabledSection.locator('input[type="checkbox"]:disabled');

        // === Multiple Checkbox Section ===
        const multiSection = page.getByRole('heading', { name: 'Multiple Checkbox Demo' }).locator('..');
        this.multipleSection = multiSection;
        this.multipleCheckboxes = multiSection.locator('div.flex > label > input[type="checkbox"]');
        
        this.uncheckAllButton = multiSection.locator('button', { hasText: 'Uncheck All' });

        // === Check All Button (Single Checkbox Section) ===
        this.checkAllButton = page.getByRole('button', { name: 'Check All' });
    }

    // -----------------------------
    // Generic Click Methods
    // -----------------------------

    /**
     * Click single, disabled, or "Check All" button
     * @param {any} type
     */
    async clickCheckbox(type) {
        switch (type) {
            case 'single':
                await this.singleCheckboxLabel.check();
                break;
            case 'disabled':
                // Cannot click disabled checkbox
                break;
            case 'all':
                await this.checkAllButton.click();
                break;
            default:
                throw new Error(`Unknown checkbox type: ${type}`);
        }
    }

    /** Toggle single checkbox (click once) */
    async toggleSingle() {
        await this.singleCheckbox.click();
    }

    /**
     * Click a multiple checkbox by name
     * @param {any} optionName
     */
    async clickMultiCheckbox(optionName) {
        const checkbox = this.multipleSection.locator(`input[name="${optionName}"]`);
        await checkbox.click();
    }
    
    /** Click "Uncheck All" button for multiple checkboxes */
    async uncheckAllMulti() {
        await this.uncheckAllButton.click();
    }

    // -----------------------------
    // Verification Methods
    // -----------------------------

    /**
     * Return checked state of single/disabled checkbox
     * @param {string} type
     */
    async isChecked(type) {
        switch (type) {
            case 'single':
                return await this.singleCheckbox.isChecked(); // ✅ check actual input
            case 'disabled':
                return await this.disabledCheckbox.isChecked();
            case 'multiple': {
                const count = await this.multipleCheckboxes.count();
                const states = [];
                for (let i = 0; i < count; i++) {
                    states.push(await this.multipleCheckboxes.nth(i).isChecked());
                }
                return states;
            }
            default:
                throw new Error(`Unknown checkbox type: ${type}`);
        }
    }
    

    /**
     * Verify if a specific multiple checkbox is checked
     * @param {string} optionName
     */
    async verifyMultiCheckOption(optionName) {
        const checkbox = this.multipleSection.locator(`input[name="${optionName}"]`);
        return await checkbox.isChecked();
    }
    

    /**
     * Set a multiple checkbox to a specific state (true = check, false = uncheck)
     * @param {any} optionName
     */
    async setMultiCheckbox(optionName, checked = true) {
        const checkbox = this.multipleCheckboxes.locator(`input[name="${optionName}"]`);
        if ((await checkbox.isChecked()) !== checked) {
            await checkbox.click();
        }
    }

    /** Set all multiple checkboxes at once */
    async setAllMultiple(checked = true) {
        const count = await this.multipleCheckboxes.count();
        for (let i = 0; i < count; i++) {
            const box = this.multipleCheckboxes.nth(i);
            if ((await box.isChecked()) !== checked) {
                await box.click();
            }
        }
    }
}
