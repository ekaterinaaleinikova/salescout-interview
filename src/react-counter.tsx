import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count - 1);

    return (
        <div>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <p>Current Count: {count}</p>
        </div>
    );
}

export default Counter;
