import { expect, test } from '@playwright/test';

test('Check Menu Options', async ({ page }) => {

    // Navegar a la página de inicio de sesión
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validar que el enlace "Admin" esté visible después de iniciar sesión
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    //Encuentra los elementos del menú lateral y cuenta cuántos hay
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const CurrentMenuItemsCount = await leftMenuItems.count();
    console.log(`Total Menu Items: ${CurrentMenuItemsCount}`)

    // Validación manual del primer ítem del menú
    const firstItemText = await leftMenuItems.first().innerText();
    if (firstItemText.trim() === 'Admin') {
        console.log('✅ Admin is the expected first menu item.');
    } else {
        console.error(`❌ Error: The first item is "${firstItemText}", not the expected "Admin"`);
    }

    // Validación formal con Playwright (esto hará que el test falle si no coincide)
    await expect(leftMenuItems.first()).toHaveText('Admin');

    const currentMenuItems: string[] = [];

    for (let i = 0; i < CurrentMenuItemsCount; i++) {

        const menuItmenuText = await leftMenuItems.nth(i).innerText();
        // normalize text: take first line and trim to avoid newlines/extra spaces
        const normalized = menuItmenuText.split('\n')[0].trim();
        currentMenuItems.push(normalized);
    }
    console.log('Menu Items:', currentMenuItems);

    // Validar que el primer ítem sea Admin
    await expect(leftMenuItems.first()).toHaveText('Admin');

    const expectedMenuItems = ['Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Buzz'];

    expect(currentMenuItems).toEqual(expectedMenuItems)
});

test('Navigate left Menu', async ({ page }) => {

    // Navegar a la página de inicio de sesión
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validar que el enlace "Admin" esté visible después de iniciar sesión
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    //Encuentra los elementos del menú lateral y cuenta cuántos hay
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const CurrentMenuItemsCount = await leftMenuItems.count();

    for (let i = 0; i < CurrentMenuItemsCount; i++) {

        const menuItem = leftMenuItems.nth(i);
        const menuItemText = await menuItem.innerText();

        console.log(`Clicking on menu item: ${menuItemText}`);

        if (menuItemText !== 'Maintenance') {

            await menuItem.click();

        }
        else {
            await page.goBack();
        }

    }
}


);