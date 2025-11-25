/**
 * Combined Chat + Sentiment Analysis API
 * Handles full conversation flow with sentiment detection
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const HF_TOKEN = process.env.HF_TOKEN;

  try {
    // 1. Analyze sentiment via Hugging Face
    let sentiment = 'NEUTRAL';
    
    if (HF_TOKEN) {
      try {
        const hfResponse = await fetch(
          'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HF_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: message }),
          }
        );

        if (hfResponse.ok) {
          const data = await hfResponse.json();
          if (data[0] && Array.isArray(data[0])) {
            const topSentiment = data[0].reduce((prev, current) =>
              (prev.score > current.score) ? prev : current
            );
            sentiment = topSentiment.label;
          }
        }
      } catch (e) {
        console.warn('Sentiment analysis failed, using NEUTRAL:', e.message);
      }
    } else {
      console.warn('⚠️  HF_TOKEN not found. Using rule-based sentiment.');
    }

    // 2. Generate contextual response based on sentiment and content
    const reply = generateResponse(message, sentiment);

    // 3. Simulate realistic delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 400));

    return res.status(200).json({ sentiment, reply });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Server error',
      sentiment: 'NEUTRAL',
      reply: '⚠️ Sorry, I encountered an error. Please try again.'
    });
  }
}

/**
 * Generate intelligent response based on message content and sentiment
 */
function generateResponse(message, sentiment) {
  const lowerMsg = message.toLowerCase();

  // Negative sentiment - empathetic response
  if (sentiment === 'NEGATIVE') {
    return "I'm sorry if you're facing any issues. Would you like me to connect you to our support team? I'm here to help make things better.";
  }

  // Intent detection for common queries
  if (lowerMsg.includes('fd') || lowerMsg.includes('fixed deposit') || lowerMsg.includes('interest') || lowerMsg.includes('rate')) {
    return "Our Fixed Deposit offers an excellent 14.40% return! Members enjoy competitive rates with secure investments. Would you like help opening an FD account?";
  }

  if (lowerMsg.includes('loan')) {
    return "We offer member loans at cooperative rates. You can apply online or visit any branch. What type of loan are you interested in? Personal, vehicle, or housing?";
  }

  if (lowerMsg.includes('smart card') || lowerMsg.includes('qr') || lowerMsg.includes('otp') || lowerMsg.includes('card')) {
    return "Our Smart Card uses QR + OTP for secure member access. You can check deposits, apply for services, and more. Need help activating yours?";
  }

  if (lowerMsg.includes('branch') || lowerMsg.includes('location') || lowerMsg.includes('address') || lowerMsg.includes('office')) {
    return "Our head office is at No:1735, 18th Main Rd, Anna Nagar West, Chennai. We also have branches in Hyderabad. Check the Contact section for full details!";
  }

  if (lowerMsg.includes('account') || lowerMsg.includes('open') || lowerMsg.includes('register') || lowerMsg.includes('join')) {
    return "Opening an account is easy! Click 'Open Account' in the header or visit the Contact section. Transport employees get priority service. Welcome to Thecos!";
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
    return "You can reach us at +91 91500 70312 or visit our head office in Chennai. Our team is ready to assist you Monday-Saturday, 9 AM - 6 PM.";
  }

  if (lowerMsg.includes('time') || lowerMsg.includes('hours') || lowerMsg.includes('schedule')) {
    return "We're open Monday to Saturday, 9:00 AM to 6:00 PM. You can also reach us via phone during business hours at +91 91500 70312.";
  }

  // Positive sentiment - enthusiastic response
  if (sentiment === 'POSITIVE') {
    return "That's wonderful to hear! 😊 I'm here to help with Fixed Deposits (14.40%), loans, Smart Card services, or branch information. What would you like to explore?";
  }

  // Default helpful response
  return "I can help you with Fixed Deposits (14.40% returns), member loans, Smart Card services, or branch locations. What would you like to know more about?";
}
