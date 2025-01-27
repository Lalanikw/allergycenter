
export class WhatsAppService {
  constructor() {
    this.baseUrl = '/api/sendWhatsApp';
  }

  formatPhoneNumber(phone) {
    // Remove any non-digit characters except + and clean the number
    let cleanPhone = phone.replace(/[^\d+]/g, '')
                         .replace(/^whatsapp:/, '')
                         .replace(/^0/, '');
    
    // Ensure the number starts with +
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    
    // Add whatsapp: prefix
    return `whatsapp:${cleanPhone}`;
  }

  async sendTemplateMessage({ to, templateName, templateData, languageCode = 'en_US' }) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: this.formatPhoneNumber(to),
          templateName,
          templateData,
          languageCode,
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('Error sending WhatsApp template message:', error);
      throw error;
    }
  }

  async sendMessages({ date, timeSlot, userPhone }) {
    try {
      // Format date for the template
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Template data array
      const templateData = [formattedDate, timeSlot];

      // Send template message
      const response = await this.sendTemplateMessage({
        to: userPhone,
        templateName: 'allergycenter',
        templateData,
        languageCode: 'en_US',
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to send WhatsApp message');
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending WhatsApp messages:', error);
      return { success: false, error: error.message };
    }
  }
}