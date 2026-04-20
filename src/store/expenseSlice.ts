import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Expense, ExpenseState } from "../types"; 

const loadFromStorage = (): Expense[] => { 
  try {
    const data = localStorage.getItem("expenses"); 
    return data ? JSON.parse(data) : []; 
  } catch (error) {
    console.error("Failed to load from storage", error);
    return [];
  }
}; 

const loadBudgetsFromStorage = (): Record<Category, number> => {
  try {
    const data = localStorage.getItem("budgets");
    return data ? JSON.parse(data) : {
      "Food": 5000,
      "Transport": 3000,
      "Shopping": 10000,
      "Bills": 5000,
      "Entertainment": 5000,
      "Other": 2000
    };
  } catch (error) {
    return {
      "Food": 5000,
      "Transport": 3000,
      "Shopping": 10000,
      "Bills": 5000,
      "Entertainment": 5000,
      "Other": 2000
    };
  }
};

const initialState: ExpenseState = { 
  expenses: loadFromStorage(), 
  filteredCategory: "All", 
  dateRange: { from: "", to: "" }, 
  budgets: loadBudgetsFromStorage(),
}; 

const expenseSlice = createSlice({ 
  name: "expenses", 
  initialState, 
  reducers: { 
    addExpense: (state, action: PayloadAction<Expense>) => { 
      state.expenses.push(action.payload); 
      localStorage.setItem("expenses", JSON.stringify(state.expenses)); 
    }, 
    deleteExpense: (state, action: PayloadAction<string>) => { 
      state.expenses = state.expenses.filter(e => e.id !== action.payload); 
      localStorage.setItem("expenses", JSON.stringify(state.expenses)); 
    }, 
    setCategory: (state, action: PayloadAction<ExpenseState["filteredCategory"]>) => { 
      state.filteredCategory = action.payload; 
    }, 
    setDateRange: (state, action: PayloadAction<{ from: string; to: string }>) => { 
      state.dateRange = action.payload; 
    }, 
    updateBudget: (state, action: PayloadAction<{ category: Category; amount: number }>) => {
      state.budgets[action.payload.category] = action.payload.amount;
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
    }
  }, 
}); 

export const { addExpense, deleteExpense, setCategory, setDateRange, updateBudget } = expenseSlice.actions; 
export default expenseSlice.reducer;