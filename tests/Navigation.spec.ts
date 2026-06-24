import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjectmodel/LoginPage';

test('Check Menu Options', async ({ page }) => {

    // Navegar a la página de inicio de sesión
    //await page.goto('https://opensource-demo.orangehrmlive.com');
   // await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  //await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  //await page.getByRole('button', { name: 'Login' }).click();

    const loginPage = new LoginPage(page) //Nuevo Login as Admin
    await loginPage.LoginAsAdmin()


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
    ];

    expect(currentMenuItems).toEqual(expectedMenuItems)
});

test('Navigate left Menu with Maintenance Cancel', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');
    const maintenanceItem = leftMenuItems.filter({ hasText: 'Maintenance' });

    await maintenanceItem.click();
    await page.waitForURL('**/maintenance/purgeEmployee');

    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Validar que regresamos al menú principal
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
});

test('Navigate left Menu with Maintenance Confirm', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');
    const count = await leftMenuItems.count();

    for (let i = 0; i < count; i++) {
        const menuItem = leftMenuItems.nth(i);
        const text = (await menuItem.innerText()).trim();
        console.log(`Clicking on menu item: ${text}`);

        if (text.includes('Maintenance')) {
            await menuItem.click();

            // Esperar a que la URL cambie a la página de mantenimiento
            await page.waitForURL('**/maintenance/purgeEmployee');

            // Esperar a que el campo de contraseña esté visible
            await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

            // Escenario Confirmar
            await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
            await page.getByRole('button', { name: 'Confirm' }).click();

            // Validar que regresamos al menú principal
            await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

        } else {
            await menuItem.click();
        }
    }
});

test('Check All Qualifications Links', async ({ page }) => {

    const expectedPages = [
        { menu: 'Skills', url: '/web/index.php/admin/viewSkills' },
        { menu: 'Education', url: '/web/index.php/admin/viewEducation' },
        { menu: 'Licenses', url: '/web/index.php/admin/viewLicenses' },
        { menu: 'Languages', url: '/web/index.php/admin/viewLanguages' },
        { menu: 'Memberships', url: '/web/index.php/admin/membership' },
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();

    const qualificationOptions = page.getByRole('menu').locator('li')


    for (const expectedPage of expectedPages) {
       
        const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu });
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectedPage.url));
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();

    }
})


test('Check All Job Links', async ({ page }) => {

    const expectedJobPages = [
        { menu: 'Job Titles', url: '/web/index.php/admin/viewJobTitleList' },
        { menu: 'Pay Grades', url: '/web/index.php/admin/viewPayGrades' },
        { menu: 'Employment Status', url: '/web/index.php/admin/employmentStatus' },
        { menu: 'Job Categories', url: '/web/index.php/admin/jobCategory' },
        { menu: 'Work Shifts', url: '/web/index.php/admin/workShift' },
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Job').click();

    const jobOptions = page.getByRole('menu').locator('li')

    for (const expectedPage of expectedJobPages) {
       
        const menuOption = jobOptions.filter({ hasText: expectedPage.menu });
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectedPage.url));
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Job').click();

    }
})


test('Check All Time Reports Links', async ({ page }) => {

    const expectedTimeReportPages = [
        { menu: 'Project Reports', url: '/web/index.php/time/displayProjectReportCriteria' },
        { menu: 'Employment Reports', url: '/web/index.php/time/displayEmployeeReportCriteria' },
        { menu: 'Attendance Summary Reports', url: '/web/index.php/time/displayAttendanceSummaryReportCriteria' },
     
    ];

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Time').click();

    const timeReportOptions = page.getByRole('menu').locator('li')

    for (const expectedPage of expectedTimeReportPages) {
       
        const menuOption = timeReportOptions.filter({ hasText: expectedPage.menu });
        await menuOption.click();
        await expect(page).toHaveURL(new RegExp(expectedPage.url));
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Time').click();

    }
})