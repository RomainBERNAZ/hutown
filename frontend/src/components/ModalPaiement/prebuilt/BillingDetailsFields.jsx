import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Nom - Prénom"
        type="text"
        placeholder="Locke John"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="johnlocke@example.com"
        required
      />
      <FormField
        name="address"
        label="Addresse"
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
        type="text"
        placeholder="Sydney"
        required
      />
      <FormField
        name="state"
        label="Pays"
        type="text"
        placeholder="Australie"
        required
      />
      <FormField
        name="zip"
        label="Code Postal"
        type="text"
        placeholder="75000"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
