import styled from "@emotion/styled";

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  margin-bottom: 1rem;
  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.label`
  width: 50%;
  min-width: 70px;
  padding: 11px 0;
  color: black;
  overflow: hidden;
  font-family:Halyard;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  color: #fff;
  background-color: transparent;
  animation: 1ms void-animation-out;

  &::placeholder {
    color: black;
  }
`;

const FormField = ({ label, type, name, placeholder, required }) => {
  return (
    <FormFieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} required />
    </FormFieldContainer>
  );
};

export default FormField;
