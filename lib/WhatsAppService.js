
export class WhatsAppService {
  constructor(ownerPhone) {
    this.ownerPhone = ownerPhone;
  }

  async sendMessages({ date, timeSlot, userPhone }) {
    try {
      // Send message to owner
      const ownerResponse = await this.sendWhatsAppMessage(
        this.ownerPhone,
        this.createOwnerMessage(date, timeSlot, userPhone)
      );

      // Send confirmation to user
      const userResponse = await this.sendWhatsAppMessage(
        userPhone,
        this.createUserMessage(date, timeSlot)
      );

      return {
        success: ownerResponse.success && userResponse.success,
        ownerMessage: ownerResponse,
        userMessage: userResponse
      };
    } catch (error) {
      console.error('Error sending WhatsApp messages:', error);
      return { success: false, error: error.message };
    }
  }

  async sendWhatsAppMessage(to, message) {
    try {
      const response = await fetch('/api/sendWhatsApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, result };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return { success: false, error: error.message };
    }
  }

  createOwnerMessage(date, timeSlot, userPhone) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `New Appointment Booking:
📅 Date: ${formattedDate}
⏰ Time: ${timeSlot}
📱 Customer Phone: ${userPhone}`;
  }

  createUserMessage(date, timeSlot) {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Your appointment has been confirmed!
📅 Date: ${formattedDate}
⏰ Time: ${timeSlot}

We look forward to seeing you!`;
  }
}