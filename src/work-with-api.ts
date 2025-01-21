import axios from 'axios';

type APIResponseType = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

async function fetchLongPosts(): Promise<APIResponseType[]> {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data as APIResponseType[];

        return posts.filter(post => post.body.length > 100);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

module.exports = { fetchLongPosts };
