import {test,  expect } from "@playwright/test";

test('buying new products', async({page})=>{

    await page.goto('http://127.0.0.1:5500/')

    for(let i=0; i<=5; i++){
        await page.locator("//body/div[@class='container mt-5']/div[@id='product-list']/div[1]/div[1]/div[1]/button[1]").click()
    }
    
    await page.locator("//div[2]//div[1]//div[1]//button[1]").click()
    await page.locator("//div[3]//div[1]//div[1]//button[1]").click()
    await page.locator("#view-cart-btn").click()

    const Product1Quantity = await page.locator("//tbody[@id='cart-items']/tr[1]/td[3]").textContent()
    const Product2Quantity = await page.locator("//tbody[@id='cart-items']/tr[2]/td[3]").textContent()
    const Product3Quantity = await page.locator("//tbody[@id='cart-items']/tr[3]/td[3]").textContent()

    expect(Product1Quantity).toEqual('6')
    expect(Product2Quantity).toEqual('1')
    expect(Product3Quantity).toEqual('1')

    await page.locator("//button[@id='checkout-btn']").click()

    await page.locator("//input[@id='name']").fill("Basilio Saldarriaga")
    await page.locator("//input[@id='email']").fill("basilio9210@hotmail.com")
    await page.locator("//input[@id='address']").fill("Cr 71 # 27-106")

    await page.locator("//a[@href='#paymentInfo']").click()
    
    await page.locator("//input[@id='card-number']").fill("1111222233334444")
    await page.locator("//input[@id='card-expiry']").fill("12/29")
    await page.locator("//input[@id='card-cvc']").fill("123")

    await page.getByRole('button', {name: "Pagar"}).click()
    await expect(page.getByRole('heading', {name: "¡Tu compra fue exitosa!"}))


})


