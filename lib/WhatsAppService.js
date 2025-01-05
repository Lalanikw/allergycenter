
export class WhatsAppService {
  constructor(ownerPhone) {
    this.ownerPhone = ownerPhone?.replace(/\+/g, '');
  }

  formatMessage(booking) {
    const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      ownerMessage: `🏥 New Appointment\n\n📅 Date: ${formattedDate}\n⏰ Time: ${booking.timeSlot}\n📞 Patient Phone: ${booking.userPhone}`,
      
      userMessage: `🏥 Your Appointment is Confirmed!\n\n📅 Date: ${formattedDate}\n⏰ Time: ${booking.timeSlot}\n📍 Location: Aloka Diagnostics\nNo 673, Williamgopallawa Mawatha, Kandy.\n☎️ For queries: +94-81-3838-767`
    };
  }

  async sendMessages(booking) {
    try {
      const { ownerMessage, userMessage } = this.formatMessage(booking);
      const userPhone = booking.userPhone.replace(/\+/g, '');

      // Create promises for both messages
      const ownerPromise = this.openWhatsApp(this.ownerPhone, ownerMessage);
      const userPromise = this.openWhatsApp(userPhone, userMessage);

      // Wait for both to complete
      await Promise.all([ownerPromise, userPromise]);

      return { success: true };
    } catch (error) {
      console.error('Error sending WhatsApp messages:', error);
      return { success: false, error: error.message };
    }
  }

  openWhatsApp(phone, message) {
    return new Promise((resolve, reject) => {
      try {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        const newWindow = window.open(url, '_blank');
        
        if (newWindow) {
          resolve();
        } else {
          reject(new Error('Popup blocked'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Optional: Add retry logic for failed messages
  async retryMessage(phone, message, maxRetries = 3) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        await this.openWhatsApp(phone, message);
        return true;
      } catch (error) {
        attempts++;
        if (attempts === maxRetries) {
          throw new Error(`Failed to send message after ${maxRetries} attempts`);
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }
}
