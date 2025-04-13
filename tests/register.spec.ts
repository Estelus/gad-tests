import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify registration', () => {
  test(
    'register with correct credentials and login',
    { tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03'] },
    async ({ page }) => {
      //Arrange
      const userFirstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
      const userLastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
      const userEmail = faker.internet.email({
        firstName: userFirstName,
        lastName: userLastName,
      });
      const userPassword = faker.internet.password({
        length: 10,
        memorable: true,
        pattern: /[A-Z]/,
      });

      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();
      await registerPage.register(
        userFirstName,
        userLastName,
        userEmail,
        userPassword,
      );

      const expectedAlertPopupText = 'User created';
      // Assert
      await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageToLoadURL();
      const title = await loginPage.title();
      expect.soft(title).toContain('Login');

      // Assert
      await loginPage.login(userEmail, userPassword);

      const welcomePage = new WelcomePage(page);
      const titleWelcomePage = await welcomePage.title();
      expect(titleWelcomePage).toContain('Welcome');
    },
  );
});
