import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string || 1);
    let loggedIn;
    try {
        loggedIn = await getLoggedInUser();
        if (!loggedIn || !loggedIn.$id) {
            return <p className="text-red-500">Error: Unable to retrieve user data.</p>;
        }
    } catch (error) {
        console.error("Error fetching logged-in user:", error);
        return <p className="text-red-500">Error: Unable to fetch user data.</p>;
    }

    let accounts;
    try {
        accounts = await getAccounts({ userId: loggedIn.$id });
        if (!accounts || !accounts.data || accounts.data.length === 0) {
            return <p className="text-gray-500">No accounts available for transfer.</p>;
        }
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return <p className="text-red-500">Error: Unable to fetch account data.</p>;
    }

    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId })

    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransaction = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);


    return (
        <div className='transactions'>
            <div className='transactions-header'>
                <HeaderBox
                    title='Transaction History'
                    subtext='See your bank details and transactions.'
                />
            </div>

            <div className='space-y-6'>
                <div className='transactions-account'>
                    <div className="flex flex-col gap-2">
                        <h2 className='text-18 font-bold text-white'>
                            {account?.data.name}
                        </h2>
                        <p className='text-14 text-blue-25'>
                            {account?.data.officialName}
                        </p>
                        <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                            ●●●● ●●●● ●●●● {account?.data.mask}
                        </p>
                    </div>

                    <div className='transactions-account-balance'>
                        <p className='text-14'>
                            Current Balance
                        </p>
                        <p className='text-24 text-center font-bold'>
                            {formatAmount(account?.data.currentBalance)}
                        </p>
                    </div>
                </div>

                <section className='flex w-full flex-col gap-6'>
                    <TransactionsTable transactions={currentTransaction} />

                    {totalPages > 1 && (
                        <div className='my-4 w-full'>
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>

        </div>
    )
}

export default TransactionHistory
