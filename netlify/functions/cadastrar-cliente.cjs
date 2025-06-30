const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://script.google.com/macros/s/AKfycby0ek3abNStHawb6F96CC1NIhF7BHlqYzkqidkjfBjbzUJ7Rfe844T-KYGHQd8wnnBf/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
