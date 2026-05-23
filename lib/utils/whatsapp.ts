import { createLogger } from './logger';

const logger = createLogger('auth');

const PHONE_REGEX = /^\+[1-9]\d{1,14}$/;

/**
 * Dispatches a WhatsApp OTP verification template using Meta Cloud API.
 * In development, if credentials are missing, falls back to logging the code to console.
 */
export async function sendWhatsAppOTP(phone: string, code: string): Promise<boolean> {
  if (!PHONE_REGEX.test(phone)) {
    logger.error(`Invalid phone format provided: ${phone}`);
    throw new Error('Phone number must be in E.164 format (e.g. +1234567890)');
  }

  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME || 'nexus_otp';

  if (!token || !phoneId) {
    logger.warn(
      `WhatsApp API credentials missing. Dev Sandbox Mock Delivery:\n` +
      `┌────────────────────────────────────────┐\n` +
      `│ [WHATSAPP OTP]                         │\n` +
      `│ To: ${phone}                       │\n` +
      `│ Code: ${code}                           │\n` +
      `└────────────────────────────────────────┘`
    );
    return true;
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en_US',
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: code,
                },
              ],
            },
            {
              type: 'button',
              sub_type: 'url',
              index: '0',
              parameters: [
                {
                  type: 'text',
                  text: code,
                },
              ],
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      logger.error(`Meta Graph API request failed: ${JSON.stringify(data)}`);
      return false;
    }

    logger.info(`OTP successfully dispatched via WhatsApp Cloud API to ${phone}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send WhatsApp verification message: ${error}`);
    return false;
  }
}
