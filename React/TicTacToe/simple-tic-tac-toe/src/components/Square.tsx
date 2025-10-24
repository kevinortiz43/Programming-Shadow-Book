
// Component square, passes in value and a use state hook called onSquare click as props
// button has on click. when on click happens it passes in either X or O as a prop
// {value} shows either X or O after we click on the button 
export default function Square({ onSquareClick, ...props } : { value: string, onSquareClick: () => void }) {
  return (
    <div>
      <button className="square" onClick={onSquareClick} {...props}>
        {props.value}
      </button>
    </div>
  );
}
