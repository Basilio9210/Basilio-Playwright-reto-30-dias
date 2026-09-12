import { test } from '@playwright/test';
import { TodoPage } from '../pageobjectmodel/Todopage';

test('test TodoMVC @SanityTest', async ({ page }) => {
  const todos = ['Run', 'Walk outside', 'Read Books', 'Play'];
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodos(todos);

  await todoPage.completeTodo('Run');
  await todoPage.expectTodoVisible('Run');

  await todoPage.completeTodo('Read Books');
  await todoPage.expectListContains('Read Books');

  await todoPage.filterActive();
  await todoPage.clearCompleted();
  await todoPage.filterAll();
});