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
    categoryId: result.category.categoryId,
    categoryName: result.category.name,
    notes: result.notes,
  }));
  return expenses;
};

export default {
  getExpenses,
};
