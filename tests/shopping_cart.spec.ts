import { test } from "@playwright/test";
import { ShoppingCartPage } from "../pageobjectmodel/ShoppingCartPage";

test("buying new products", async ({ page }) => {
  const shoppingCart = new ShoppingCartPage(page);

  await shoppingCart.goto();
  await shoppingCart.addProduct(0, 6);
  await shoppingCart.addProduct(1);
  await shoppingCart.addProduct(2);
  await shoppingCart.viewCart();

  await shoppingCart.expectProductQuantity(0, "6");
  await shoppingCart.expectProductQuantity(1, "1");
  await shoppingCart.expectProductQuantity(2, "1");

  await shoppingCart.checkout();
  await shoppingCart.fillCustomerDetails(
    "Basilio Saldarriaga",
    "basilio9210@hotmail.com",
    "Cr 71 # 27-106",
  );
  await shoppingCart.openPaymentInfo();
  await shoppingCart.fillPaymentDetails("1111222233334444", "12/29", "123");
  await shoppingCart.pay();
  await shoppingCart.expectPurchaseSuccessful();
});

