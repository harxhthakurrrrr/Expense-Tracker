import Anthropic from "@anthropic-ai/sdk"; 
import { Category } from "../types"; 

const client = new Anthropic({ 
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY, 
  dangerouslyAllowBrowser: true, 
}); 

export const aiCategorize = async (title: string): Promise<Category> => { 
  if (!title || title.length < 3) return "Other"; 

  try { 
    const response = await client.messages.create({ 
      model: "claude-3-5-sonnet-20240620", 
      max_tokens: 10, 
      messages: [ 
        { 
          role: "user", 
          content: `Categorize this expense into exactly one of these categories: 
Food, Transport, Shopping, Bills, Entertainment, Other. 

Expense: "${title}" 

Reply with ONLY the category name, nothing else.`, 
        }, 
      ], 
    }); 

    const content = response.content[0];
    const result = content.type === "text" 
      ? (content.text.trim() as Category) 
      : "Other"; 

    const validCategories: Category[] = [ 
      "Food", "Transport", "Shopping", "Bills", "Entertainment", "Other" 
    ]; 

    return validCategories.includes(result) ? result : "Other"; 
  } catch (error) { 
    console.error("AI categorization failed:", error); 
    return "Other"; 
  } 
}; 
