import { Card } from "@/components/ui/card";
import Page from "../template/Page";
import { mock } from "../../../environment/mock";
import { Badge } from "@/components/ui/badge";
import { BuildingIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SuggestionPanel = () => {
  const sugestoes = mock.Suggestion;
  const empresas = mock.Company;
  const agentes = mock.SuggestionsAgent;
  const status = mock.SuggestionStatus;

  return (
    <Page
      title="Painel de Sugestões"
      children={
        <>
          {/* TODO: Create filters for suggestions by company, agent, date range, and keywords */}
          <div className="flex h-screen w-full flex-col gap-10 p-5">
            {/* TODO: Refactor into components */}
            {empresas.map((empresa) => (
              <div key={empresa.id} className="flex flex-col gap-4">
                <div className="flex w-fit flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <BuildingIcon className="h-8 w-8 text-primary" />

                    <span className="select-none text-3xl font-semibold">
                      {empresa.name}
                    </span>
                  </div>

                  <Separator />
                </div>

                <div className="flex flex-1 gap-10">
                  {sugestoes.map((sugestao) => (
                    <Card
                      key={sugestao.id}
                      className="flex h-52 w-96 gap-3 p-2"
                    >
                      <Badge className="p-1"></Badge>

                      {/* TODO: Add a counter for agents assigned to the suggestion, a status select, an agents select, display the requesting company, and dynamic colors based on the status */}
                      <div className="flex h-2/3 w-3/4 flex-col overflow-hidden py-4">
                        <Tooltip>
                          <TooltipTrigger className="flex cursor-default border-none bg-transparent">
                            <span className="select-none truncate pb-2 text-xl font-bold text-muted-foreground">
                              {sugestao.title}
                            </span>
                          </TooltipTrigger>

                          <TooltipContent>{sugestao.title}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className="flex cursor-default border-none bg-transparent">
                            <span
                              className="text-md select-none overflow-hidden pb-2 text-left text-muted-foreground"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {sugestao.description}
                            </span>
                          </TooltipTrigger>

                          <TooltipContent>
                            {sugestao.description}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
};

export default SuggestionPanel;
