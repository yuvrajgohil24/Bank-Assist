import FundsTransferForm from '@/components/FundsTransferForm'
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
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

    return (
        <section className='payment-transfer'>
            <HeaderBox
                title='Payment Transfer'
                subtext='Please provide any specific details or notes related to the payment transfer'
            />

            <section className='size-full pt-5'>
                <FundsTransferForm
                    accounts={accountsData}
                />
            </section>
        </section>
    )
}

export default Transfer
