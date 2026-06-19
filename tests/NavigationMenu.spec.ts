import { expect, test } from '@playwright/test';


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
