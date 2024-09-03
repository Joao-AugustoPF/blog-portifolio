import React from "react";

interface TooltipProps {
  config: Array<React.FC<any>>;
  actions: { [key: string]: any };
  state: { [key: string]: boolean };
}

export const Tooltip: React.FC<TooltipProps> = ({ config, actions, state }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 flex space-x-2">
      {config.map((Component, index) => (
        <Component
          key={index}
          onClick={actions[Component.name]}
          isActive={state[Component.name]}
        />
      ))}
    </div>
  );
};
