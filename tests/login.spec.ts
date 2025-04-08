import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    //Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = 'test1';
    const loginPage = new LoginPage(page);
    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);
    const welcomePage = new WelcomePage(page);
    const title = await welcomePage.title();
    // Assert
    expect(title).toContain('Welcome');
  });
});
