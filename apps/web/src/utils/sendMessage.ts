export const sendMessageToAPI = async (message: string, selectedEndpoint:string) => {
  try {
    const response = await fetch(`http://localhost:3000${selectedEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.response || data.message || 'No response received';
  } catch (error) {
    console.error('Error calling API:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
};
