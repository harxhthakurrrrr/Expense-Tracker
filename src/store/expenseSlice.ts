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

const initialState: ExpenseState = { 
  expenses: loadFromStorage(), 
  filteredCategory: "All", 
  dateRange: { from: "", to: "" }, 
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
  }, 
}); 

export const { addExpense, deleteExpense, setCategory, setDateRange } = expenseSlice.actions; 
export default expenseSlice.reducer;