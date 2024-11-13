import HeaderSection from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {

  const loggedIn = { firstName: "Yuvraj", lastName: "Gohil", email: "newuser12@gmail.com" };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderSection
            type="greeting"
            title="Welcome"
            user={loggedIn.firstName || "Guest"}
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
