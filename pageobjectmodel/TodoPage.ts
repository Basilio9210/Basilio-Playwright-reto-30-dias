import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly input: Locator;
  readonly todoList: Locator;
  readonly activeLink: Locator;
  readonly allLink: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByTestId('text-input');
    this.todoList = page.getByTestId('todo-list');
    this.activeLink = page.getByRole('link', { name: 'Active' });
    this.allLink = page.getByRole('link', { name: 'All' });
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto('https://todomvc.com/examples/react/dist/');
  }

  async addTodo(text: string) {
    await this.input.fill(text);
    await this.input.press('Enter');
  }

  async addTodos(items: string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  getTodoItem(text: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: text });
  }

  async completeTodo(text: string) {
    await this.getTodoItem(text).getByTestId('todo-item-toggle').check();
  }

  async filterActive() {
    await this.activeLink.click();
  }

  async filterAll() {
    await this.allLink.click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async expectTodoVisible(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectListContains(text: string) {
    await expect(this.todoList).toContainText(text);
  }
}