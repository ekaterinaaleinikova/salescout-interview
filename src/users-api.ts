import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

const users: { name: string }[] = [];

app.post('/user', (req: Request, res: Response) => {
    const { name } = req.body;
    if (name) {
        users.push({ name });
        return res.status(201).json({ message: 'User added' });
    }
    return res.status(400).json({ message: 'Name is required' });
});

app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
