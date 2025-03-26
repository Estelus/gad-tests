import { Page } from '@playwright/test';

export class ArticlePage {
  articlesUrl = '/articles.html';
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.articlesUrl);
  }
  async title(): Promise<string> {
    return this.page.title();
  }
}
