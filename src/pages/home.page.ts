import { Page } from '@playwright/test';

export class HomePage {
  homePageUrl = '/';
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('this.homePageUrl');
  }
  async title(): Promise<string> {
    return this.page.title();
  }
}
