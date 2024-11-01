import {Tooltip, Button} from "@nextui-org/react";

export default function DelayButton() {
  return (
    <div className="flex gap-2">
      <Tooltip color="primary" content="Tooltip 1" delay={1000}>
        <Button color="primary" variant="flat">
          Hover me (delay 1000ms)
        </Button>
      </Tooltip>
    </div>
  );
}