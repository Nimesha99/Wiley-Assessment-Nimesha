import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://onlinelibrary.wiley.com/');
  });
  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  //Verify login with valid user name and password. 
  //User will be successfully logged in and directed to home page.
  //User's name should be visible in the home page top right corner.

  test('verify login', async ({ page }) => {

    await page
      .getByRole('button', { name: 'Log in or Register' }).click();
    await page
      .getByLabel('Email or Customer ID').fill('nimeshakavi@gmail.com');
    await page
      .getByPlaceholder('Enter your password').fill('@#123Wiley');
    await page
      .getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Nimesha')).toBeVisible();

  });

  //Search for a resource by valid ISBN
  //When the user enters a valid ISBN and performs a search system should display the resource with the specific ID 
  //The user can then access the resource by clicking on the displayed result and it will display 
  //details such as resource name, ISBN, author etc.

  test('search resource', async ({ page }) => {

    await page
      .getByPlaceholder('Search publications, articles, keywords, etc.').fill('ISBN:9781119312451');
    await page
      .getByLabel('Submit Search').click();
    await page
      .getByRole('link', { name: 'Software Quality Assurance,' }).click();
    await expect(page).toHaveURL('https://onlinelibrary.wiley.com/doi/book/10.1002/9781119312451');
    await expect(page.getByText('ISBN:9781119312451')).toBeVisible();
    await expect(page.getByText('Software Quality Assurance', { exact: true })).toBeVisible();
    await expect(page.getByText('Claude Y. Laporte, Alain April')).toBeVisible();

  })

  //Verify the sub topics under the given subject 
  //when the user clicks to expand the subject, available sub topics should be displayed 

  test('search subject', async ({ page }) => {

    await page
      .getByText('Agriculture, Aquaculture & Food Science').click();
    await expect(page.getByText('Agriculture', { exact: true })).toBeVisible();
    await expect(page.getByText('Aquaculture, Fisheries & Fish Science', { exact: true })).toBeVisible();
    await expect(page.getByText('Food Science & Technology', { exact: true })).toBeVisible();


  })


});

