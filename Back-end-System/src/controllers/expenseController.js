const Expense = require("../models/Expense");


exports.addExpense = async (req,res)=>{
     try{
      const {title , amount , category , date , note } = req.body;
      if(!title || !amount){
        return res.status(400).json({message : "title and amount are mandatory"});
      }
       
      const expense = new Expense({
        user: req.userId,
          title,
          amount,
          category,
          date,
          note,

      } );
      await expense.save();
      res.status(201).json({message : "expense added successfully ", expense})

     }catch(error){
           console.error("Add expense error:", error);
    res.status(500).json({ message: "Something went wrong" });
     }
};

exports.getExpenses = async(req,res)=>{

    try{
  const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
  res.status(200).json(expenses);
    }catch(error){
        console.error("error: ",error);
        res.status(400).send("somthing went wrong");
    }
  }

exports.updateExpense = async(req,res)=>{

try{
  const {id} = req.params;
  const {title , amount,category , date , note} = req.body;

  const expense = await Expense.findOneAndUpdate(
    {_id:id , user:req.userId},
    {title,amount,category,date,note},
    {new : true}
  );
  if(!expense){
    return res.status(404).json({
      message : "expense not found"
    });   
  }
  res.status(200).json({
    message:"successfully updated Expense",
    expense,
  })
}catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }

}

exports.deleteExpense = async(req,res)=>{

  try{
    const {id} = req.params;
    const userId = req.userId

    const expense = await Expense.findOneAndDelete({
      _id : id , user : userId
    });

    if(!expense){
      return res.status(404).json({
        message : "expens enot found"
      });
    }

    res.status(200).json({
      message : "deleted the expense",
      expense,
    })


  }catch(error){
    console.error("error : ",error);
    res.status(500).send("error is there some wher in the delete xepense")
  }



}




