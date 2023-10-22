import cl100k_base from "gpt-tokenizer";

export const countTokens = (text: string) => cl100k_base.encode(text).length;
