import { useState } from "react";
import Image from "next/image";


const WasdUIModal = ({setActivateWASDControls}) => {
  const [wasdModalIsOpen, setWasdModalIsOpen] = useState(true);

  function handleClick(){
    setWasdModalIsOpen(false)
    setActivateWASDControls(true);
  }
  return wasdModalIsOpen ? (
    <div onClick={handleClick}>
      <Image
        src="/assets/wasdUI.png"
        width={474}
        height={281}
        alt="navigational controls"
        className="pointer-events-auto"
      />
    </div>
  ) : null;
};

export default WasdUIModal;
