import React, { useState, useEffect } from 'react';



const Rule = ({ id, updateValue }) => {
    const [rule, setRule] = useState('')
    return (
        <div>
            <label className="subreddit__form__label" htmlFor='Rules'>{id}:</label>
            <input
                className="subreddit__form__input"
                name='rules'
                type='text'
                placeholder={`Rule ${id}`}
                value={rule}
                onChange={updateValue(setRule)}
            />
        </div>
    )
}

export default Rule;