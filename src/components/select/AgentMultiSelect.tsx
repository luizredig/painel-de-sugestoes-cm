import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import { SuggestionsAgent } from "@prisma/client";
import { CheckIcon } from "lucide-react";

type AgentMultiSelectProps = {
  disabled?: boolean;
  selectedAgentIds?: string[];
  onChange?: (selectedIds: string[]) => void;
};

const AgentMultiSelect = ({
  disabled = false,
  selectedAgentIds = [],
  onChange,
}: AgentMultiSelectProps) => {
  const [agents, setAgents] = useState<SuggestionsAgent[]>([]);
  const [selectedAgents, setSelectedAgents] =
    useState<string[]>(selectedAgentIds);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/agents");
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    setSelectedAgents(selectedAgentIds);
  }, [selectedAgentIds]);

  const handleAgentChange = (agentId: string) => {
    if (disabled) return;

    const updatedSelection = selectedAgents.includes(agentId)
      ? selectedAgents.filter((id) => id !== agentId)
      : [...selectedAgents, agentId];

    setSelectedAgents(updatedSelection);

    if (onChange) {
      onChange(updatedSelection);
    }
  };

  const getFirstNames = (agentIds: string[]) => {
    const agentNames = agents
      .filter((agent) => agentIds.includes(agent.id))
      .map((agent) => agent.name.split(" ")[0]);
    return agentNames.join(", ");
  };

  return (
    <Select>
      <SelectTrigger
        className={`h-fit w-full px-2 py-1 text-[10px] outline-none focus:ring-background ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={disabled}
      >
        <span>
          {selectedAgents.length > 0
            ? getFirstNames(selectedAgents)
            : "Nenhum responsável"}
        </span>
      </SelectTrigger>

      {!disabled && (
        <SelectContent>
          <SelectGroup className="w-40">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => handleAgentChange(agent.id)}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 ${
                  selectedAgents.includes(agent.id) ? "bg-green-100" : ""
                }`}
              >
                <span className="truncate">{agent.name}</span>
                {selectedAgents.includes(agent.id) && (
                  <CheckIcon className="text-green-600" />
                )}
              </div>
            ))}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  );
};

export default AgentMultiSelect;
