import handler from './pages/api/chat.js';

const req = {
    method: 'POST',
    body: {
        message: 'Hello'
    }
};

const res = {
    status: (code) => {
        console.log(`Status: ${code}`);
        return res;
    },
    json: (data) => {
        console.log('Response:', JSON.stringify(data, null, 2));
        return res;
    }
};

console.log('Testing Chat API...');
handler(req, res).catch(err => console.error('Handler error:', err));
