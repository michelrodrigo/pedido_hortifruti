const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycby0ek3abNStHawb6F96CC1NIhF7BHlqYzkqidkjfBjbzUJ7Rfe844T-KYGHQd8wnnBf/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const resultText = await response.text();

    return {
      statusCode: 200,
      body: resultText,
    };
  } catch (err) {
    console.error('Erro na function:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
