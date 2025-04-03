import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
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
    return (
        <section className='flex'>
            <div className='my-banks'>
                <HeaderBox
                    title='My Bank Accounts'
                    subtext='Effortlessly manage your banking activities.'
                />

                <div className='space-y-4'>
                    <h2 className='header-2'>
                        Your Cards
                    </h2>
                    <div className='flex flex-wrap gap-6'>
                        {accounts && accounts.data.map((a: Account) => (
                            <BankCard
                                key={accounts.id}
                                account={a}
                                userName={loggedIn?.firstName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBanks
