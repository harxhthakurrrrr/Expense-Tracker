import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useMemo } from "react";

export const useExpenses = () => {
  const { expenses, filteredCategory, dateRange } = useSelector(
    (state: RootState) => state.expenses
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesCategory =
        filteredCategory === "All" || expense.category === filteredCategory;
      
      const expenseDate = new Date(expense.date);
      const matchesDate =
        (!dateRange.from || expenseDate >= new Date(dateRange.from)) &&
        (!dateRange.to || expenseDate <= new Date(dateRange.to));

      return matchesCategory && matchesDate;
    });
  }, [expenses, filteredCategory, dateRange]);

  const summary = useMemo(() => {
    return filteredExpenses.reduce(
      (acc, curr) => {
        acc.total += curr.amount;
        if (!acc.byCategory[curr.category]) {
          acc.byCategory[curr.category] = 0;
        }
        acc.byCategory[curr.category] += curr.amount;
        return acc;
      },
      { total: 0, byCategory: {} as Record<string, number> }
    );
  }, [filteredExpenses]);

  return {
    expenses,
    filteredExpenses,
    summary,
    filteredCategory,
    dateRange,
  };
};
