import CreateCustomer from "./Features/Customer-Features/CreateCustomer";
import Customer from "./Features/Customer-Features/Customer";
import AccountOperations from "./Features/Account-Features/AccountOperations";
import BalanceDisplay from "./Features/Account-Features/BalanceDisplay";
import { useSelector } from "react-redux";
function App() {
  const fullName = useSelector((state) => state.customer.fullName);
  console.log(fullName);
  return (
    <div>
    <h1>🏦 The React-Redux Bank ⚛️</h1>
    {fullName === "" ? 
      <CreateCustomer/>
     : (
      <>
        <Customer />
        <AccountOperations />
        <BalanceDisplay />
      </>
    )}
  </div>
    
  );

}

export default App;
