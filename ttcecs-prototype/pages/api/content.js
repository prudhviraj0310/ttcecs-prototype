
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Path to the shared content file
            const filePath = path.join(process.cwd(), 'data', 'site-content.json');

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'Content file not found' });
            }

            const fileContents = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContents);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error reading site content:', error);
            res.status(500).json({ message: 'Error reading site content' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
