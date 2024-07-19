
const Balance = ({value}) => {
 
  return (
    <div>
      <span className="font-bold ml-4 text-lg mr-4 mt-4">Your Balance</span>
      <span className="font-semibold text-lg">Rs {value}</span>
    </div>
  );
};

export default Balance;
