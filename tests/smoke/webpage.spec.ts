import { ArticlesPage } from '../../src/pages/article.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title', { tag: '@GAD-R01-01' }, async ({ page }) => {
    //Arrange
    const homePage = new HomePage(page);
    // Act
    await homePage.goto();

    // Assert
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('articles page title', { tag: '@GAD-R01-02' }, async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    // Act
    await articlePage.goto();

    // Assert
    const title = await articlePage.title();
    expect(title).toContain('Articles');
  });

  test('comments page title', { tag: '@GAD-R01-02' }, async ({ page }) => {
    //Arrange
    const commentsPage = new CommentsPage(page);
    // Act
    await commentsPage.goto();

    // Assert
    const title = await commentsPage.title();
    expect(title).toContain('Comments');
  });
});
