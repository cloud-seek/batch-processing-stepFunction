exports.handler = async (event) => {
  console.log('Event: ', event);
  // Process the event and return the result
  // Add your processing logic here
  return {
      statusCode: 200,
      body: JSON.stringify('Processing complete')
  };
};