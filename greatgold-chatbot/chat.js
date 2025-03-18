document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submit
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {  // Ensure non-empty input
        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: userInput })
        })
        .then(response => response.json())
        .then(data => {
            const chatArea = document.getElementById('chat-area');
            chatArea.innerHTML += `<div>User: ${userInput}</div>`;  // Display user message
            chatArea.innerHTML += `<div>Bot: ${data.response}</div>`;  // Display bot response
            document.getElementById('user-input').value = '';  // Clear input after sending
            chatArea.scrollTop = chatArea.scrollHeight;  // Scroll to the bottom
        })
        .catch(error => console.error('Error:', error));
    }
});
