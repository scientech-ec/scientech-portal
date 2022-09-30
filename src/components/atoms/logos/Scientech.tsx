import React from "react";

interface Props {
  variant?: "white" | "blue";
  className?: string;
}

const Scientech: React.FC<Props> = ({ variant, className }) => {
  const getVariant = () => {
    switch (variant) {
      case "white":
        return "fill-white";
      default:
        return "fill-scientech";
    }
  };

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 904.7 104.3"
      className={`${className} ${getVariant()}`}
    >
      <path
        d="M80,90c-5.3,7.3-12.2,10.2-16.4,12.1c-8.5,3.6-15.7,3.7-22.8,3.8c-11.5,0.1-20.3-2.3-24.3-3.5
		c-7-2.2-12.5-5-16.4-7.3C2.8,88.1,5.4,81.1,8,74.2c9.3,4.7,17.4,7,23.2,8.2c2.1,0.5,9.3,1.9,17.6,0.2c3.7-0.8,6.2-1.9,7.4-4.1
		c1-1.8,1-4,0.5-5.7c-1.8-5.3-10.1-5.9-24.7-9.7c-4.4-1.2-10.4-2.9-17.5-5.3c-2.2-1.1-6.1-3.5-9.4-7.9C0.1,43,0,35.9,0,33.4
		c0-1.9-0.1-6.2,1.7-11C6,11.1,17.1,6.2,21.8,4.1c9-4,16.9-4,22.6-4.1c9.2-0.1,16.4,1.7,20.1,2.9c6.5,2,11.8,4.6,15.6,7
		c-2.8,6.7-5.6,13.4-8.4,20C64.3,25.9,57.6,24,53,23c-8.2-1.7-12.7-1-16,0c-2.4,0.8-5.6,1.9-7.1,5c-1.2,2.3-1.2,5.4,0.1,7.7
		c2.1,3.8,7.3,4.2,11.9,5c0.7,0.1,17,2.8,27.8,8.8c4.3,2.4,13.4,7.5,16,17.5C88.6,78.1,81.5,87.9,80,90z"
      />
      <path
        d="M180.9,70.6c5.6,5.4,11.2,10.9,16.8,16.3c-3.8,4.1-11.2,11.1-22.8,15.4c-7.8,3-14.8,3.7-19.6,3.8
		c-3.4,0.1-25.8,0.3-42.2-17.7c-13-14.3-13.9-31-14-35.5c0.1-3.5,1-23.2,17.4-38.4C132.4-0.1,151.3,0.1,155,0.2c4.9,0,12,0.6,20,3.4
		c11.2,4,18.7,10.4,22.6,14.4c-5.6,5.9-11.2,11.7-16.7,17.6c-3.5-3.4-11-9.7-22-10.9c-1.9-0.2-4.1-0.4-7,0
		c-11.7,1.9-21.4,13-23,24.8c-0.5,3.2-0.2,5.8,0,7.2c1.6,11.7,11.4,22.6,23,24.5c3,0.5,5.2,0.2,7.1,0
		C169.9,80.2,177.4,73.9,180.9,70.6z"
      />
      <rect x="217.1" y="1.9" width="28.2" height="102.2" />
      <rect x="271.7" y="1.9" width="79.4" height="22.9" />
      <polygon points="271.7,40.8 271.7,63.6 351.1,63.4 351.1,40.8 	" />
      <rect x="271.7" y="81.2" width="79.4" height="22.9" />
      <polygon points="374,104.1 402.1,104.1 402.1,84.9 374,51.2 	" />
      <polygon points="374,1.9 374,15.7 447.3,104.1 470.9,104.1 470.9,91.8 397.6,1.9 	" />
      <polygon points="442.8,1.9 442.8,21.4 470.9,54.8 470.9,1.9 	" />
      <polygon points="486.8,1.9 486.8,24.7 518.6,24.7 518.6,104.1 546.8,104.1 546.8,24.7 576.7,24.7 576.7,1.9 	" />
      <rect x="594.7" y="2" width="79.4" height="22.9" />
      <polygon points="594.7,40.9 594.7,63.7 674,63.6 674,40.9 	" />
      <rect x="594.7" y="81.4" width="79.4" height="22.9" />
      <path
        d="M772.9,70.5c5.6,5.4,11.2,10.9,16.8,16.3c-3.8,4.1-11.2,11.1-22.8,15.4c-7.8,3-14.8,3.7-19.6,3.8
		c-3.4,0.1-25.8,0.3-42.2-17.7c-13-14.3-13.9-31-14-35.5c0.1-3.5,1-23.2,17.4-38.4C724.4-0.3,743.3,0,747,0.1c4.9,0,12,0.6,20,3.4
		c11.2,4,18.7,10.4,22.6,14.4c-5.6,5.9-11.2,11.7-16.7,17.6c-3.4-3.4-11-9.7-22.1-10.9c-1.9-0.2-4.1-0.4-7,0
		c-11.7,1.9-21.4,13-23,24.8c-0.4,3.2-0.2,5.8,0,7.2c1.7,11.7,11.4,22.6,23,24.5c2.9,0.5,5.2,0.2,7.1,0
		C761.9,80,769.4,73.8,772.9,70.5z"
      />
      <path
        d="M809.6,2.1c-0.1,34-0.1,68-0.2,102c8.8,0.1,17.6,0.2,26.5,0.2V63.7h40.3v40.5h28.5V2.1c-9.4,0-18.8,0-28.2,0
		c0,12.9,0,25.8,0.1,38.6c-13.6,0-27.1,0-40.7,0c0-12.9,0-25.8,0-38.6H809.6z"
      />
    </svg>
  );
};

export default Scientech;
