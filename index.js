const streamResults = async ({
  messages,
  apiHost = "https://api.openai.com/v1/chat/completions",
  model = "gpt-3.5-turbo",
  apiKey,
  messageEle,
}) => {
  const response = await fetch(apiHost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      /* [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ]*/
      stream: true,
    }),
  });

  const reader = response.body?.getReader();

  let responseText = "";
  while (reader && true) {
    const { value, done } = await reader.read();
    if (done) {
      console.log("[streamResults] Stream complete");
      break;
    }
    // Process each chunk
    const chunk = new TextDecoder().decode(value);
    chunk.split("\n").forEach((line) => {
      if (line) {
        line = line.replace("data: ", "");
        if (!line.startsWith("{")) {
          console.log("[streamResults] Ignoring line:", line);
          return;
        }
        try {
          const json = JSON.parse(line);
          console.log("[streamResults] Chunk:", json);
          if ("content" in json.choices[0].delta) {
            responseText += json.choices[0].delta.content;
          }
        } catch (e) {
          console.error("[streamResults] Error parsing JSON: " + e + line);
        }
      }
    });

    messageEle.innerHTML = renderMarkdown(responseText);
  }
  console.log("[streamResults] final response:\n" + responseText);

  return responseText;
};
