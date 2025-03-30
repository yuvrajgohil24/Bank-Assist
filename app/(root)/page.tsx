import HeaderSection from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {

  // const loggedIn = { firstName: "Yuvraj", lastName: "Gohil", email: "newuser12@gmail.com" };
  const loggedIn = await getLoggedInUser();

  console.log("LoggedIN-->", loggedIn)

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderSection
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1245}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, { currentBalance: 500.12 }]}
      />
    </section>
  )
};

export default Home;
