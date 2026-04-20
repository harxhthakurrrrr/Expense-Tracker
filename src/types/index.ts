export type Category = 
  | "Food" 
  | "Transport" 
  | "Shopping" 
  | "Bills" 
  | "Entertainment" 
  | "Other"; 

export interface Expense { 
  id: string; 
  title: string; 
  amount: number; 
  category: Category; 
  date: string; 
  note?: string; 
} 

export interface ExpenseState { 
  expenses: Expense[]; 
  filteredCategory: Category | "All"; 
  dateRange: { 
    from: string; 
    to: string; 
  }; 
  budgets: Record<Category, number>;
}