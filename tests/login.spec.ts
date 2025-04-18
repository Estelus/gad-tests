import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      //Arrange
      const userEmail = testUser1.userEmail;
      const userPassword = testUser1.userPassword;
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.login(userEmail, userPassword);
      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();

      // Assert
      expect(title).toContain('Welcome');
    },
  );
  test('login with incorrect credentials @GAD-R02-01', async ({ page }) => {
    //Arrange
    const userEmail = testUser1.userEmail;
    const userPassword = 'incorrectPassword';
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);

    // Assert
    await expect(loginPage.loginError).toHaveText(
      'Invalid username or password',
    );
    const title = await loginPage.title();
    expect(title).toContain('Login');
  });
});
