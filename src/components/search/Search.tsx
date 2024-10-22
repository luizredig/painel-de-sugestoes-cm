import DatePicker from "../datepicker/Datepicker";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

const Search = () => {
  return (
    <>
      <Card>
        {/* Buscar */}
        <Input />

        {/* Data de início */}
        <DatePicker />

        {/* Data de fim */}
        <DatePicker />

        {/* Select de Empresa */}
        <Select />

        {/* Select de Status */}
        <Select />
      </Card>
    </>
  );
};

export default Search;
