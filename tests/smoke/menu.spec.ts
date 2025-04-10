import { ArticlesPage } from '../../src/pages/article.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);

    // Act
    await articlePage.goto();
    await articlePage.mainMenu.commentsButton.click();
    const commentsPage = new CommentsPage(page);
    const title = await commentsPage.title();

    // Assert
    expect(title).toContain('Comments');
  });

  test('articles button navigates to article page @GAD-R01-03', async ({
    page,
  }) => {
    //Arrange
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();
    const articlePage = new ArticlesPage(page);
    const title = await articlePage.title();

    // Assert
    expect(title).toContain('Articles');
  });

  test('home page button navigates to main page @GAD-R01-03', async ({
    page,
  }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);

    // Act
    await articlePage.goto();
    await articlePage.mainMenu.homePage.click();
    const homePage = new CommentsPage(page);
    const title = await homePage.title();

    // Assert
    expect(title).toContain('GAD');
  });
});
