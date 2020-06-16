import cookies from "@/assets/scripts/cookies";
const { token } = cookies;
const apiUrl = "https://expense-tracker-api.vercel.app/api";

const options = {
  withCredentials: true,
  credentials: "include",
  headers: {
    Authorization: `Bearer ${token}`,
    "X-FP-API-KEY": "iphone",
    "Content-Type": "application/json",
  },
};

// POST signUp
const signUp = async (user) => {
  const res = await fetch(`${apiUrl}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data.message;
};

// POST signIn
const signIn = async (user) => {
  const res = await fetch(`${apiUrl}/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Authorization: `Basic ${btoa(`${user.userName}:${user.password}`)}`,
    },
  });
  const data = await res.json();
  return data;
};

// Begin expenses methods
// .
// .
// .
// GET expenses
const getExpenses = async (queryFilter, queryDate, isPieChart) => {
  const res = await fetch(
    `${apiUrl}/expenses/${queryFilter}/${queryDate}?isPieChart=${isPieChart}`,
    {
      method: "GET",
      ...options,
    }
  );
  const data = await res.json();

  if (isPieChart) return data.data;
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

// POST create expense
const addExpense = async (expense) => {
  const res = await fetch(`${apiUrl}/expenses`, {
    method: "POST",
    body: JSON.stringify(expense),
    ...options,
  });
  const data = await res.json();
  console.log(data);
  return data.message;
};

// UPDATE expense
const updateExpense = async (expense) => {
  const res = await fetch(`${apiUrl}/expenses/${expense.id}`, {
    method: "PUT",
    body: JSON.stringify(expense),
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// DELETE expense
const deleteExpense = async (expenseId) => {
  const res = await fetch(`${apiUrl}/expenses/${expenseId}`, {
    method: "DELETE",
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// End expenses methods

// Begin incomes methods
// .
// .
// .
// GET incomes
const getIncomes = async (queryFilter, queryDate) => {
  const res = await fetch(`${apiUrl}/incomes/${queryFilter}/${queryDate}`, {
    method: "GET",
    ...options,
  });
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

// POST create income
const addIncome = async (income) => {
  const res = await fetch(`${apiUrl}/incomes`, {
    method: "POST",
    body: JSON.stringify(income),
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// PUT update income
const updateIncome = async (income) => {
  const res = await fetch(`${apiUrl}/incomes/${income.id}`, {
    method: "PUT",
    body: JSON.stringify(income),
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// DELETE delete income by id
const deleteIncome = async (incomeId) => {
  const res = await fetch(`${apiUrl}/incomes/${incomeId}`, {
    method: "DELETE",
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// End incomes methods

// Begin categories methods
// .
// .
// .
// GET categories
const getCategories = async (type) => {
  const res = await fetch(`${apiUrl}/categories/${type}`, {
    method: "GET",
    ...options,
  });
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
    ...options,
  });
  const data = await res.json();
  return data.message;
};

// End categories methods

export default {
  signUp,
  signIn,
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
