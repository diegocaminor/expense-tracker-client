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
    type: "expense",
    category: {
      categoryId: result.category ? result.category.categoryId : "",
      name: result.category ? result.category.name : "",
    },
    notes: result.notes,
    date: result.createdAt,
  }));
  return expenses;
};

// GET incomes by userID
const getIncomes = async () => {
  const res = await fetch(`${apiUrl}/incomes`);
  const data = await res.json();
  console.log(data);
  let incomes = data.data.map((result, index) => ({
    index: index + 1,
    id: result._id,
    amount: result.amount,
    type: "income",
    category: {
      categoryId: result.category ? result.category.categoryId : "",
      name: result.category ? result.category.name : "",
    },
    notes: result.notes,
    date: result.createdAt,
  }));
  return incomes;
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
  return data.message;
};

// DELETE delete expense by id
const deleteExpense = async (expenseId) => {
  const res = await fetch(`${apiUrl}/expenses/${expenseId}`, {
    method: "DELETE",
  });
  const data = await res.json();
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
  return data.message;
};

// PUT update income
const updateIncome = async (income) => {
  const res = await fetch(`${apiUrl}/incomes/${income.id}`, {
    method: "PUT",
    body: JSON.stringify(income),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.message;
};

// DELETE delete income by id
const deleteIncome = async (incomeId) => {
  const res = await fetch(`${apiUrl}/incomes/${incomeId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data.message;
};

// GET categories
const getCategories = async (type) => {
  const res = await fetch(`${apiUrl}/categories/${type}`);
  const data = await res.json();
  let categories = data.data.map((result) => ({
    categoryId: result._id,
    name: result.name,
  }));
  return categories;
};

// POST category
const addCategory = async (category) => {
  const res = await fetch(`${apiUrl}/categories`, {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.message;
};

export default {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
  getCategories,
  addCategory,
};
