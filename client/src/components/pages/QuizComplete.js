import React from 'react';

const QuizComplete = props => {
    const { history } = props;

    window.addEventListener('popstate', () => {
        history.go(1)
    })

    return (
        <div style={{ margin: 'auto', textAlign: 'center'}}>
            <h1>You're all Set! Thank You!</h1>
        </div>
    )
}

export default QuizComplete