import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";

const FormSchema = z.object({
  search: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  company: z
    .enum(["empty", "ravibras", "automatech", "newblow", "unipoli"])
    .optional(),
  status: z.enum(["empty", "novo", "emAndamento", "concluido"]).optional(),
});

const Search = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "empty",
      status: "empty",
    },
  });

  const handleReset = () => {
    form.reset();

    form.setValue("company", "empty");
    form.setValue("status", "empty");
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="flex flex-col gap-4 overflow-hidden p-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-primary">Filtro de busca</h2>

            <Separator />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-row lg:gap-4">
            <FormField
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Data de Início</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="overflow-hidden truncate pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Escolha a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="endDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Data de Fim</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="overflow-hidden truncate pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Escolha a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Empresa</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Selecione a empresa"
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="empty">Nenhuma</SelectItem>{" "}
                      <SelectItem value="ravibras">Ravibras</SelectItem>
                      <SelectItem value="automatech">Automatech</SelectItem>
                      <SelectItem value="newblow">Newblow</SelectItem>
                      <SelectItem value="unipoli">Unipoli</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Status</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="flex w-full">
                        <SelectValue
                          placeholder="Selecione o status"
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="empty">Nenhum</SelectItem>{" "}
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="emAndamento">Em andamento</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleReset}>
              Limpar Filtros
            </Button>

            <Button type="submit" className="hover:bg-primary">
              Buscar
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default Search;
