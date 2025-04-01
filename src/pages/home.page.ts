import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  homePageUrl = '/';
  constructor(page: Page) {
    super(page);
  }
}
