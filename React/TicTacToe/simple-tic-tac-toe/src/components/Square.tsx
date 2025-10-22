
// Component square, passes in value and a use state hook called onSquare click as props
// button has on click. when on click happens it passes in either X or O as a prop
// {value} shows either X or O after we click on the button 
export default function Square({ value, onSquareClick } : { value: string, onSquareClick:()=> void }) {
  return (
    <div>
      {/* // on click is a built in react method that handlues button clicks
      // on square click is my custom logic that im passing in to the button as a prop because im "lifting the states of square up to my board" */}

      
      <button className="square" onClick={onSquareClick}>{value}</button>
    </div>
  );
}
