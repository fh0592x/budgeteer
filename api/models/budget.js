import mongoose, { Schema } from 'mongoose';

const BudgetSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        default: 0
    },
    incomes: [
        new Schema({
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
                min: 0
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        })
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalExpended: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expenses: [
        new Schema({
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true,
                min: 0
            },
            category: {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        })
    ]
});

BudgetSchema.pre('save', function(next) {
    const budget = this;
    budget.amount = budget.incomes.reduce((acc, val) => acc + val.amount, 0);
    budget.totalExpended = budget.expenses.reduce((acc, val) => acc + val.amount, 0);
    return next();
});

export default mongoose.model('Budget', BudgetSchema);