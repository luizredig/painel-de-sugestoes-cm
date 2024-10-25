import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import { SuggestionsAgent } from "@prisma/client";
import { CheckIcon } from "lucide-react";

interface AgentMultiSelectProps {
  agents: SuggestionsAgent[];
}

const AgentMultiSelect: React.FC<AgentMultiSelectProps> = ({ agents }) => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleAgentChange = (agentName: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentName)
        ? prev.filter((name) => name !== agentName)
        : [...prev, agentName],
    );
  };

  const getFirstNames = (fullNames: string[]) => {
    return fullNames.map((name) => name.split(" ")[0]).join(", ");
  };

  return (
    <Select>
      <SelectTrigger className="h-fit w-64 px-2 py-1 text-[10px] outline-none focus:ring-background focus-visible:ring-0">
        <span>
          {selectedAgents.length > 0
            ? getFirstNames(selectedAgents)
            : "Nenhum responsável"}
        </span>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup className="w-40">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => handleAgentChange(agent.name)}
              className={`flex cursor-pointer items-center justify-between px-3 py-2 ${
                selectedAgents.includes(agent.name) ? "bg-green-100" : ""
              }`}
            >
              <span className="truncate">{agent.name}</span>
              {selectedAgents.includes(agent.name) && (
                <CheckIcon className="text-green-600" />
              )}
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AgentMultiSelect;
