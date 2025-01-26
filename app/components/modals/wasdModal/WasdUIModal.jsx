import { useState } from "react";
import Image from "next/image";

const WasdUIModal = () => {
  const [wasdModalIsOpen, setWasdModalIsOpen] = useState(true);

  return wasdModalIsOpen ? (
    <div onClick={() => setWasdModalIsOpen(false)}>
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
