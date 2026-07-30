import Transaction from "../models/Transaction.js";

const addTransaction = async (req, res) => {
    try {
        const { title, amount, category, type, date } = req.body;

        const transaction = new Transaction({
            title,
            amount,
            category,
            type,
            date,
        });

        await transaction.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully",
            transaction,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

export { addTransaction, getTransaction, updateTransaction, deleteTransaction };