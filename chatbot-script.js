// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotWidget1 = document.getElementById('chatbot-widget1');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeBtn = document.getElementById('close-chatbot');
    const sendBtn = document.getElementById('send-message');
    const userInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chatbot-messages');
    
    // Sample responses based on user queries
    const botResponses = {
        'where am i': {
            text: 'Based on your current GPS location, you are at Main Street, Downtown. This appears to be a safe area with good lighting.',
            delay: 1000
        },
        'am i on the right path': {
            text: 'Yes, you are currently on the right path to your destination. You should arrive at your destination in approximately 15 minutes if you maintain your current pace.',
            delay: 1200
        },
        'route': {
            text: 'Your current route is: Main St → Park Ave → Central Square. This is the safest route to your destination based on well-lit areas and public presence.',
            delay: 1500
        },
        'help': {
            text: 'I can help you with: location information, route guidance, safety tips, or connect you with emergency services. What would you like assistance with?',
            delay: 800
        },
        'emergency': {
            text: 'If you need emergency assistance, press the SOS button on the bottom right corner of your screen. This will immediately alert your emergency contacts and share your location.',
            delay: 1000
        },
        'safety tips': {
            text: 'Here are some safety tips for your journey: Stay in well-lit areas, keep your phone charged, share your location with trusted contacts, and stay aware of your surroundings.',
            delay: 1800
        },
        'contacts': {
            text: 'You have 5 emergency contacts set up: Mom, Dad, John Smith, Rachel Green, and Police Station. Would you like me to notify any of them about your current location?',
            delay: 1500
        }
    };

    // Default response for unrecognized queries
    const defaultResponse = {
        text: "I'm not sure I understand. You can ask me about your location, route, safety tips, or emergency assistance.",
        delay: 1000
    };

    // Open chatbot modal
    chatbotWidget.addEventListener('click', () => {
        chatbotModal.classList.add('active');
    });
    chatbotWidget1.addEventListener('click', () => {
        chatbotModal.classList.add('active');
    });

    // Close chatbot modal
    closeBtn.addEventListener('click', () => {
        chatbotModal.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, true);

        // Clear input
        userInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process message and get response
        const response = processMessage(message);

        // Add bot response after delay
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add bot response
            addMessage(response.text, false);
            
            // Scroll to bottom
            scrollToBottom();
        }, response.delay);
    }

    // Add message to chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isUser ? '<span>U</span>' : '<span>F</span>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message typing-indicator-container';
        indicator.innerHTML = `
            <div class="message-avatar">
                <span>F</span>
            </div>
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        indicator.id = 'typing-indicator';
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Process user message and get appropriate response
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords in the message
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        // Handle location-related queries
        if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            return botResponses['where am i'];
        }
        
        // Handle path-related queries
        if (lowerMessage.includes('path') || lowerMessage.includes('way') || lowerMessage.includes('going')) {
            return botResponses['am i on the right path'];
        }
        
        // Return default response if no specific match
        return defaultResponse;
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Sample suggested questions
    const suggestedQuestions = [
        "Where am I right now?",
        "Am I on the right path to home?",
        "What's the safest route?",
        "Safety tips for night travel"
    ];

    // Add suggested questions after a delay
    setTimeout(() => {
        addMessage("Here are some questions you can ask me:", false);
        
        suggestedQuestions.forEach(question => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'message bot-message';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = '<span>F</span>';
            
            const content = document.createElement('div');
            content.className = 'message-content suggestion';
            content.innerHTML = `<p>${question}</p>`;
            content.style.cursor = 'pointer';
            content.addEventListener('click', () => {
                addMessage(question, true);
                
                // Show typing indicator
                showTypingIndicator();
                
                // Process message and get response
                const response = processMessage(question);
                
                // Add bot response after delay
                setTimeout(() => {
                    removeTypingIndicator();
                    addMessage(response.text, false);
                    scrollToBottom();
                }, response.delay);
            });
            
            suggestionDiv.appendChild(avatar);
            suggestionDiv.appendChild(content);
            
            chatMessages.appendChild(suggestionDiv);
        });
        
        scrollToBottom();
    }, 1000);
});