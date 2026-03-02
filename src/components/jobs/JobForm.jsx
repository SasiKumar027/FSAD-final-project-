import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function JobForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    department: "",
    hoursPerWeek: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Input label="Title" name="title" value={form.title} onChange={handleChange} />
      <Input label="Department" name="department" value={form.department} onChange={handleChange} />
      <Input label="Hours/Week" name="hoursPerWeek" value={form.hoursPerWeek} onChange={handleChange} />
      <Button onClick={() => onSubmit(form)}>Add Job</Button>
    </div>
  );
}

export default JobForm;