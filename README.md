# HTML GPT

## Why

Using OpenAI GPT models in shortcuts to integrate with Apple ecosystem. Check my blog post for more information https://blog.rankun.net/2024/03/17/explain_ask_proofread/.

## Where is My OpenAI API Key Used?

If you are using Shortcuts described https://blog.rankun.net/2024/03/17/explain_ask_proofread/

1. It's saved in plain text under iCloud/Shortcuts/ask/openai_api_key.txt
2. Used to encrypt your queries
3. Used as a query parameter (base64 encoded) and opened like this: `https://html-gpt.rankun.net/gpt_enc.html?api_key=weoi...&data_url=https://bin.sps.mindfine.com/...`

html-gpt/gpt_enc.html

1. The GitHub Pages server will have the base64 encoded api_key in the access logs
2. Used to decrypt the queries
3. Used to query OpenAI GPT API in your browser

html-gpt/gpt.html

1. The GitHub Pages server will have the base64 encoded api_key in the access logs
2. Used to query OpenAI GPT API in your browser

In summary:

1. `bin.sps.mindfine.com` only keeps the encrypted queries for 1min, doesn't have access to your API Key.
2. `html-gpt.rankun.net` (GitHub Pages) will have the base64 encoded API Key in the URL.

## How to update

1. Edit index.js and gpt.html
2. Push
