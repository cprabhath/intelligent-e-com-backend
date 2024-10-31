//-----------------------OpenAI API Key-------------------------//
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai.OpenAIApi(openaiApiKey);
// -----------------------------------------------------------------//

// -----------------------OpenAI Completion-------------------------//
const openaiCompletion = async (prompt) => {
  try {
    const completion = await openaiClient.createCompletion({
      // Fine-tuned engine
      engine: "ft:gpt-3.5-turbo-0125:personal:test02:A0oYYebK:ckpt-step-84",
      prompt: prompt,
      max_tokens: 100,
    });

    return completion.data.choices[0].text.trim(); // Ensure we get the text
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Failed to get completion from OpenAI API");
  }
};
//-----------------------------------------------------------------//

// ==================== Find Product By Description ==================== //
const findbyProductDescription = async (description) => {
  try {
    const prompt = `Find a product with the following description: ${description}`;
    const responseText = await openaiCompletion(prompt);
    
    // Assuming responseText contains the product ID or details
    const product = await ProductSchema.findById({
      _id: responseText, // Ensure that this corresponds to an ID
    });

    return {
      description: description,
      response: product,
      success: true,
    };
  } catch (err) {
    console.error("Error finding product:", err);
    return {
      description: description,
      response: err.message, // Provide error message for clarity
      success: false,
    };
  }
};
// ====================================================================== //
