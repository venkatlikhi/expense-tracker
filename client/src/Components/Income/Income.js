import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <TotalIncomeCard>
          Total Income: <Amount>${totalIncome()}</Amount>
        </TotalIncomeCard>
        <IncomeContent>
          <FormContainer>
            <Form />
          </FormContainer>
          <IncomeList>
            {incomes.map((income) => (
              <IncomeItem
                key={income._id}
                {...income}
                indicatorColor="var(--color-green)"
                deleteItem={deleteIncome}
              />
            ))}
          </IncomeList>
        </IncomeContent>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
`;

const TotalIncomeCard = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 2rem;
  gap: 0.5rem;
`;

const Amount = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-green);
`;

const IncomeContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormContainer = styled.div`
  flex: 1;
`;

const IncomeList = styled.div`
  flex: 1;
`;

export default Income;
