import mongoose, { Schema, Document } from 'mongoose';

type DuplicatedUsers = {
    email: string;
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        // Подключаемся к MongoDB
        await mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

        // Создаем пользователей
        const user1 = new User({ name: 'Name1', email: 'name1@example.com' });
        const user2 = new User({ name: 'Name2', email: 'name2@example.com' });

        await user1.save();
        await user2.save();

        // Находим пользователей с одинаковыми email
        const duplicatedUsers = await User.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 }, users: { $push: "$name" } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        return duplicatedUsers.map(user => ({ email: user._id }));

    } catch (error) {
        console.error('Error:', error);
        return [];
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { manageUsers };
