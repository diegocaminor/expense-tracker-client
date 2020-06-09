const apiUrl = "http://localhost:3000/api";

// GET expenses by userID
const getExpenses = async () => {
  const res = await fetch(`${apiUrl}/expenses`);
  const data = await res.json();
  console.log(data);
  let expenses = data.data.map((result, index) => ({
    index: index + 1,
    id: result._id,
    amount: result.amount,
    category: {
      categoryId: result.category ? result.category.categoryId : "",
      name: result.category ? result.category.name : "",
    },
    notes: result.notes,
    date: result.createdAt,
  }));
  return expenses;
};

// POST create expense
const addExpense = async (expense) => {
  const res = await fetch(`${apiUrl}/expenses`, {
    method: "POST",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data.message;
};

// PUT update expense
const updateExpense = async (expense) => {
  const res = await fetch(`${apiUrl}/expenses/${expense.id}`, {
    method: "PUT",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data.message;
};
// DELETE delete expense by id
const deleteExpense = async (expenseId) => {
  const res = await fetch(`${apiUrl}/expenses/${expenseId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("deleteExpense");
  console.log(data);
  return data.message;
};

// POST create income
const addIncome = async (income) => {
  const res = await fetch(`${apiUrl}/incomes`, {
    method: "POST",
    body: JSON.stringify(income),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data.message;
};

export default {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  addIncome,
};
