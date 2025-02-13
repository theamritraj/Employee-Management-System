import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Employee } from '../types/Employee';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  onSubmit: (employee: Employee) => void;
  initialData?: Employee | null;
}

const EmployeeForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, reset } = useForm<Employee>({
    defaultValues: initialData || {
      id: '',
    name: '',
    department: '',
    position: '',
  },
});


useEffect(() => {
  if (initialData) {
    reset(initialData);
  } else {
    reset({
      id: '',
      name: '',
      department: '',
      position: ''
    });
  }
}, [initialData, reset]);


  return (
    <Card className="mb-6">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...register('name', { required: true })} className="w-full" />
          <Input placeholder="Department" {...register('department', { required: true })} className="w-full" />
          <Input placeholder="Position" {...register('position', { required: true })} className="w-full" />
          <Button type="submit" className="w-full bg-gray-600 hover:bg-blue-700 text-white">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;


