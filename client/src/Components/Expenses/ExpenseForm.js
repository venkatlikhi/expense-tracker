import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputControl>
        <Input
          type="text"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </InputControl>
      <InputControl>
        <Input
          type="number"
          value={amount}
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
        />
      </InputControl>
      <InputControl>
        <DatePickerStyled
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date: date })}
        />
      </InputControl>
      <InputControl>
        <Select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </Select>
      </InputControl>
      <InputControl>
        <Textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        />
      </InputControl>
      <SubmitButton>
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </SubmitButton>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputControl = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #fff;
  background: transparent;
  resize: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: rgba(34, 34, 96, 0.9);

  &::placeholder {
    color: rgba(34, 34, 96, 0.4);
  }
`;

const DatePickerStyled = styled(DatePicker)`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #fff;
  background: transparent;
  resize: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: rgba(34, 34, 96, 0.9);

  &::placeholder {
    color: rgba(34, 34, 96, 0.4);
  }
`;

const Select = styled.select`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #fff;
  background: transparent;
  resize: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: rgba(34, 34, 96, 0.9);

  &:focus,
  &:active {
    color: rgba(34, 34, 96, 1);
  }

  option {
    color: rgba(34, 34, 96, 0.9);
    background: white;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #fff;
  background: transparent;
  resize: none;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: rgba(34, 34, 96, 0.9);

  &::placeholder {
    color: rgba(34, 34, 96, 0.4);
  }
`;

const SubmitButton = styled.div`
  button {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    &:hover {
      background: var(--color-green) !important;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  animation: shake 0.5s ease-in-out;
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(10px);
    }
    50% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default ExpenseForm;
