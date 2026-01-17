import test, { expect } from "@playwright/test";

test('Handling radio button', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/radiobutton-demo')

    await expect(page.getByText('Male').first()).not.toBeChecked();
    await expect(page.getByText('Female').first()).not.toBeChecked()

    //click on male
    await page.getByText('Male').first().click()
    await page.getByTestId('buttoncheck').click({force:true})
    expect(page.getByText('Radio button \'Male\' is checked'))
    await expect(page.getByText('Male').first()).toBeChecked()
    await expect(page.getByText('Female').first()).not.toBeChecked()

    //click on female
    await page.getByText('Female').first().click()
    await page.getByTestId('buttoncheck').click({force:true})
    expect(page.getByText('Radio button \'Female\' is checked'))
    await expect(page.getByText('Female').first()).toBeChecked()
    await expect(page.getByText('Male').first()).not.toBeChecked()


})

test('Handling Drag and Drop', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/drag-and-drop-demo')

    /**
     * @param {any} ele
     */
    // Draggable 1 or Draggable 2
    function getDragElementByName(ele) {
        return page.locator('#todrag>span', {hasText:`${ele}`})
    }

    function getDraggedItemList (){
        return page.getByTestId('droppedlist').locator('span').allInnerTexts()
    }
    const dropLocation = page.getByTestId('mydropzone')

    await getDragElementByName('Draggable 1').dragTo(dropLocation)

    expect(await getDraggedItemList()).toContain('Draggable 1')

    expect(page.locator('#todrag>span')).toHaveCount(1)
    expect(page.locator('#todrag>span')).toHaveText('Draggable 2')

    //Dargging Draggabel 2 now
    await getDragElementByName('Draggable 2').dragTo(dropLocation)

    expect(await getDraggedItemList()).toContain('Draggable 1')
    expect(await getDraggedItemList()).toContain('Draggable 2')
    expect(page.locator('#todrag>span')).toHaveCount(0)

    console.log(JSON.stringify(await getDraggedItemList()))

    
})
test('Handling Drag and Drop demo 2', async ({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/drag-and-drop-demo')

    const dragEle = page.getByTestId('draggable')
    const dragToDropArea = page.getByTestId('droppable')  

    await dragEle.hover()
    await page.mouse.down()

    await dragToDropArea.hover()
    await page.mouse.up()
    expect(dragToDropArea).toHaveCount(1)
    expect(dragToDropArea.locator('p', {hasText:"Dropped!"}))
})