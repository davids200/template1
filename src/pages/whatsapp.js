import puppeteer from 'puppeteer';

async function isPhoneNumberOnWhatsApp(phoneNumber) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to WhatsApp web interface
  await page.goto('https://web.whatsapp.com');
  
  // Wait for user to scan QR code
  await page.waitForSelector('._1JNuk');
  
  // Enter phone number in search field
  await page.type('._2_1wd.copyable-text.selectable-text', phoneNumber);
  
  // Press enter to initiate chat
  await page.keyboard.press('Enter');
  
  // Check if chat was created
  const chatCreated = await page.waitForSelector('._2wP_Y');
  
  await browser.close();
  
  return chatCreated !== null;
}

// Example usage
isPhoneNumberOnWhatsApp('+1234567890')
  .then((isOnWhatsApp) => {
    console.log(`Is on WhatsApp: ${isOnWhatsApp}`);
  });
