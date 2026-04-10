export const submitToWebhook = async (data: any, type: 'PRODUCTION' | 'EARLY_CAPTURE' | 'GET_BOOKING' | 'UPDATE_BOOKING') => {
    console.log(`Submitting to ${type} webhook:`, data);
    
    // Mock response for GET_BOOKING to prevent form crash
    if (type === 'GET_BOOKING') {
        return [
            {
                date: new Date().toISOString().split('T')[0],
                time_slot1: '10:00 AM',
                time_slot2: '2:00 PM',
                row_number: 1
            }
        ];
    }
    
    return { success: true };
};
