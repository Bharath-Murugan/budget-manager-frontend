export interface Budget{
    budgetId?: number;
    categoryId: number;
    amount: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}