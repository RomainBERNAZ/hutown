import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Nom - Prénom"
        id="nameForm"
        type="text"
        placeholder="Locke John"
        required
      />
      <FormField
        name="email"
        id="emailForm"
        label="Email"
        type="email"
        placeholder="johnlocke@example.com"
        required
      />
      <FormField
        name="line1"
        id="line1Form"
        label="Adresse"
        type="text"
        placeholder="Sur une île, au milieu de l'océan"
        required 
      />
      <FormField
        name="address"
        label="Informations complémentaires"
        type="text"
        placeholder="Bâtiment, lot etc. (facultatif)"
        required
      />
      <FormField
        name="city"
        label="Ville"
        id="cityForm"
        type="text"
        placeholder="Sydney"
        required
      />
      <FormField
        name="zip"
        label="Code Postal"
        id="zipForm"
        type="text"
        placeholder="75000"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
