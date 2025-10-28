const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getSummary = async (req,res)=>{
    try{
        const userId = req.userId ;

      const incomes = await Income.find({user:userId});
      const expenses = await Expense.find({user:userId});

      const totalIncome = await incomes.reduce((sum , income)=> sum + income.amount ,0) ;
      const totalExpense = await expenses.reduce((sum , expense)=>sum + expense.amount,0);
      const balance = totalIncome - totalExpense;
       const recentTransactions = [
      ...incomes.map((i) => ({
        type: "income",
        title: i.title,
        amount: i.amount,
        date: i.date,
      })),
      ...expenses.map((e) => ({
        type: "expense",
        title: e.title,
        amount: e.amount,
        date: e.date,
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
       res.status(200).json({
      message: "Summary fetched successfully",
      summary: {
        totalIncome,
        totalExpense,
        balance,
        recentTransactions,
      },
    });

}catch(error){
    console.error("error : ",error);
    res.status(500).json({
      message: "Server error while fetching summary",
    });
}



}