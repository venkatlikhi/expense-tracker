import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <div className="amount-con">
              <AmountCard title="Total Income" amount={totalIncome()} />
              <AmountCard title="Total Expense" amount={totalExpenses()} />
              <AmountCard title="Total Balance" amount={totalBalance()} />
            </div>
            <Chart />
          </div>
          <div className="history-con">
            <History />
            <SalaryRange title="Salary" data={incomes} />
            <SalaryRange title="Expense" data={expenses} />
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const AmountCard = ({ title, amount }) => (
  <div className="amount-card">
    <h4>{title}</h4>
    <p>
      {dollar} {amount}
    </p>
  </div>
);

const SalaryRange = ({ title, data }) => (
  <>
    <h2 className="salary-title">
      Min <span>{title}</span>Max
    </h2>
    <div className="salary-item">
      <p>${Math.min(...data.map((item) => item.amount))}</p>
      <p>${Math.max(...data.map((item) => item.amount))}</p>
    </div>
  </>
);

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
  }

  .chart-con {
    grid-column: 1 / 4;
    height: 400px;

    .amount-con {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 2rem;
    }
  }

  .amount-card {
    background: #fff;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;

    h4 {
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--primary-color);
    }
  }

  .history-con {
    grid-column: 4 / -1;

    h2 {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .salary-title {
      font-size: 1.2rem;
      color: var(--primary-color);

      span {
        font-size: 1.8rem;
        color: var(--color-accent);
      }
    }

    .salary-item {
      background: #fff;
      border: 2px solid #ffffff;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      padding: 1rem;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-weight: 600;
        font-size: 1.6rem;
        color: var(--primary-color);
      }
    }
  }
`;

export default Dashboard;
