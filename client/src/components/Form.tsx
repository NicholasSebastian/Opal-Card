import styled from "styled-components";

const Form = styled.form`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    margin-top: 0;
  }

  > div {
    margin-bottom: 10px;
    width: 360px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > label {
      font-size: 14px;
    }

    > input {
      width: 60%;
      padding: 2px 8px;
      border-color: transparent;
      -moz-appearance: textfield;

      :focus {
        outline: 3px solid #A37B73;
      }

      :disabled {
        background-color: #DB7F67;
        color: #000;
      }
        
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

export default Form;
