import './BoatifySuccess.scss'

const BoatifySuccess = () => {
    return (
        <div className="content">
            <svg
              width="100"
              height="100"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
            <circle
              fill="none"
              stroke="#008000"
              stroke-width="20"
              cx="200"
              cy="200"
              r="190"
              stroke-linecap="round"
              transform="rotate(-90 200 200)"
              className="circle"
            />
            <polyline
              fill="none"
              stroke="#008000"
              points="88,214 173,284 304,138"
              stroke-width="24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="tick"
              />
            </svg>
        </div>
      );
}
 
export default BoatifySuccess;