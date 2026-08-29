export interface Expense{
    expenseId: number;
    userId: number;
    amount: number;
    categoryId: number;
    description: string;
    expenseDate: Date;
    createdAt: Date;
}