import { Page } from '@playwright/test';

export class CommentsPage {
  commentsUrl = '/comments.html';
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.commentsUrl);
  }
  async title(): Promise<string> {
    return this.page.title();
  }
}
