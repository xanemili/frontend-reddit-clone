import React, { useState, useEffect } from 'react';



const Rule = ({ id, rules, setRules }) => {
    const [rule, setRule] = useState('')

    const updateValue = async (e) => {
        await setRule(e.target.value)
        console.log(rule)
        let newRules = rules
        newRules[id - 1] = e.target.value
        setRules(newRules)
    }

    return (
        <div>
            <label className="subreddit__form__label" htmlFor='Rules'>{id}:</label>
            <input
                className="subreddit__form__input"
                name='rules'
                type='text'
                placeholder={`Rule ${id}`}
                value={rule}
                onChange={updateValue}

            />
        </div>
    )
}

export default Rule;